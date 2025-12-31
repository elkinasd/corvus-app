import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lead, TimelineEvent } from '../../../../core/models/lead.model';

@Component({
  selector: 'app-lead-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead-drawer.component.html',
  styleUrl: './lead-drawer.component.scss',
})
export class LeadDrawerComponent {
  @Input() lead: Lead | null = null;
  @Output() close = new EventEmitter<void>();

  // State for actions form
  statusLabels: Record<string, string> = {
    new: 'Nuevo',
    contacted: 'Contactado',
    visit: 'Visita Agendada',
    proposal: 'Cotización',
    option: 'Opcionado',
    negotiation: 'Cierre',
  };

  activeAction: 'email' | 'call' | 'note' | 'whatsapp' | null = null;

  // Input models
  noteContent: string = '';
  callOutcome: string = '';
  emailSubject: string = '';
  emailBody: string = '';

  onClose() {
    this.close.emit();
    this.activeAction = null;
  }

  toggleAction(action: 'email' | 'call' | 'note' | 'whatsapp') {
    if (this.activeAction === action) {
      this.activeAction = null;
    } else {
      this.activeAction = action;
      // Reset inputs
      this.noteContent = '';
      this.callOutcome = '';
      this.emailSubject = `Seguimiento: ${this.lead?.company || 'Proyecto'}`;
      this.emailBody = '';
    }
  }

  saveNote() {
    if (!this.noteContent.trim() || !this.lead) return;

    this.addEventToTimeline({
      id: Date.now().toString(),
      type: 'note',
      title: 'Nota interna',
      description: this.noteContent,
      date: new Date(),
    });

    this.activeAction = null;
  }

  logCall() {
    if (!this.callOutcome.trim() || !this.lead) return;

    this.addEventToTimeline({
      id: Date.now().toString(),
      type: 'call',
      title: 'Llamada registrada',
      description: this.callOutcome,
      date: new Date(),
    });

    this.activeAction = null;
  }

  sendEmail() {
    if (!this.emailBody.trim() || !this.lead) return;

    this.addEventToTimeline({
      id: Date.now().toString(),
      type: 'email',
      title: `Email: ${this.emailSubject}`,
      description: this.emailBody,
      date: new Date(),
    });

    this.activeAction = null;
  }

  sendWhatsApp() {
    if (!this.noteContent.trim() || !this.lead) return;

    this.addEventToTimeline({
      id: Date.now().toString(),
      type: 'whatsapp',
      title: `WhatsApp`,
      description: this.noteContent,
      date: new Date(),
    });

    this.activeAction = null;
  }

  private addEventToTimeline(event: TimelineEvent) {
    if (this.lead) {
      if (!this.lead.timeline) {
        this.lead.timeline = [];
      }
      this.lead.timeline.unshift(event);
    }
  }
}
