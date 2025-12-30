import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = signal(true); // Signal to toggle password visibility
  isLoading = signal(false); // Signal to show loading state

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault(); // Prevent button submit
    this.hidePassword.update((value) => !value);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      // Simulate API call
      setTimeout(() => {
        console.log('Login Data:', this.loginForm.value);
        this.isLoading.set(false);
        // Navigate to dashboard after "success"
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
  }
}
