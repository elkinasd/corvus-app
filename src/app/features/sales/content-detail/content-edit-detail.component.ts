import { Component, Input, signal, inject, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductDetail, StatusOption, ProducerTeamOption } from '../product-detail.interface';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-content-edit-detail',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatIconModule,
        AsyncPipe
    ],
    templateUrl: './content-edit-detail.component.html',
    styleUrl: './content-edit-detail.component.scss'
})
export class ContentEditDetailComponent implements OnChanges, OnInit {

    @Input() product!: ProductDetail;
    private fb = inject(FormBuilder);
    public productForm!: FormGroup;

    private specialCharactersRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ]*$/;

    matcher = new ImmediateErrorStateMatcher();

    // Options Configuration
    statusOptions: StatusOption[] = [
        {
            value: 'sandbox',
            label: 'Sandbox',
            description: 'El producto está en una versión beta la cual podría presentar cambios y aún no se ha llevado a producción.'
        },
        {
            value: 'production',
            label: 'Producción',
            description: 'Ya ha completado su fase de construcción y puede ser usado por un consumidor'
        }
    ];

    producerTeams: ProducerTeamOption[] = [
        { value: 'Créditos de Consumo', label: 'Créditos de Consumo' },
        { value: 'Cuentas de Ahorro', label: 'Cuentas de Ahorro' },
        { value: 'Tarjetas de Crédito', label: 'Tarjetas de Crédito' },
        { value: 'Canales Digitales', label: 'Canales Digitales' },
        { value: 'Seguridad Bancaria', label: 'Seguridad Bancaria' },
        { value: 'Inversiones', label: 'Inversiones' }
    ];

    filteredTeams!: Observable<ProducerTeamOption[]>;

    // --- Lifecycle Hooks ---

    ngOnInit() {
        this.initForm();
        this.setupAutocomplete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['product'] && this.product && this.productForm) {
            this.patchFormValues();
        }
    }

    initForm() {
        this.productForm = this.fb.group({
            generalInfo: this.fb.group({
                status: ['', Validators.required],
                producerTeam: ['', Validators.required],
                spanishName: ['', [Validators.required, Validators.pattern(this.specialCharactersRegex)]],
                summary: ['', Validators.required],
                description: ['', Validators.required],
                benefits: this.fb.array([], [Validators.required, Validators.minLength(2)]),
                useCases: ['']
            }),
            functionalDetail: this.fb.group({
                stages: this.fb.array([]),
                usageConditions: ['']
            }),
            complementaryInfo: this.fb.group({
                additionalDocs: this.fb.array([]),
                images: this.fb.array([]),
            })
        });

        // Initialize empty structures if no product yet
        if (!this.product) {
            this.addBenefit(); // Add 1
            this.addBenefit(); // Add 2 (min required)
            this.initStages(); // Add 6 empty slots
            this.initAdditionalDocs(); // Add 3 empty slots
            this.initImages(); // Add 6 empty slots
        } else {
            this.patchFormValues();
        }
    }

    private patchFormValues() {
        if (!this.productForm) return;

        const info = this.product.generalInfo || {};
        this.generalInfo.patchValue({
            status: info.status || '',
            producerTeam: info.producerTeam || '',
            spanishName: info.spanishName || '',
            summary: info.summary || '',
            description: info.description || '',
            useCases: info.useCases || ''
        }, { emitEvent: true });

        this.initBenefits();
        this.initStages();
        this.initAdditionalDocs();
        this.initImages();
    }

    // --- Tab 1: General Info ---

    get generalInfo() {
        return this.productForm.get('generalInfo') as FormGroup;
    }

    get benefits() {
        return this.productForm.get('generalInfo.benefits') as FormArray;
    }

    get spanishName() {
        return this.generalInfo.get('spanishName')!;
    }

    private initBenefits() {
        this.benefits.clear();
        const benefitValues = this.product.generalInfo?.benefits || [];
        const initialCount = Math.max(benefitValues.length, 2);

        for (let i = 0; i < initialCount; i++) {
            this.addBenefitControl(benefitValues[i] || '', i);
        }
    }

    addBenefit(value: string = '') {
        if (this.benefits.length < 6) {
            this.addBenefitControl(value, this.benefits.length);
        }
    }

    private addBenefitControl(value: string, index: number) {
        const validators = index < 2 ? [Validators.required] : [];
        this.benefits.push(this.fb.control(value, validators));
    }

    // Helper for Autocomplete
    private setupAutocomplete() {
        const producerTeamControl = this.generalInfo.get('producerTeam');
        if (producerTeamControl) {
            this.filteredTeams = producerTeamControl.valueChanges.pipe(
                startWith(''),
                map((value: string) => this._filter(value || '')),
            );
        }
    }

    private _filter(value: string): ProducerTeamOption[] {
        const filterValue = value.toLowerCase();
        return this.producerTeams.filter(option => option.label.toLowerCase().includes(filterValue));
    }

    // --- Tab 2: Functional Detail ---

    get functionalDetail() {
        return this.productForm.get('functionalDetail') as FormGroup;
    }

    get stages() {
        return this.productForm.get('functionalDetail.stages') as FormArray;
    }

    private initStages() {
        const stagesArray = this.stages;
        stagesArray.clear();
        for (let i = 0; i < 6; i++) {
            const validators = i < 2 ? [Validators.required] : [];
            stagesArray.push(this.fb.control('', validators));
        }
    }

    // --- Tab 3: Complementary Info ---

    get complementaryInfo() {
        return this.productForm.get('complementaryInfo') as FormGroup;
    }

    get additionalDocs() {
        return this.productForm.get('complementaryInfo.additionalDocs') as FormArray;
    }

    get images() {
        return this.productForm.get('complementaryInfo.images') as FormArray;
    }

    private initAdditionalDocs() {
        const additionalDocsArray = this.additionalDocs;
        additionalDocsArray.clear();
        for (let i = 0; i < 3; i++) {
            const validators = i < 2 ? [Validators.minLength(10)] : [];
            additionalDocsArray.push(this.fb.control('', validators));
        }
    }

    private initImages() {
        const imagesArray = this.images;
        imagesArray.clear();
        for (let i = 0; i < 6; i++) {
            const validators = i < 2 ? [Validators.minLength(10)] : [];
            imagesArray.push(this.fb.control('', validators));
        }
    }
}

export class ImmediateErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}