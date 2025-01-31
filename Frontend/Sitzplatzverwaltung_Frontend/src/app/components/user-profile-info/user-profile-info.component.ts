import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { computedAsync } from '../../shared/angular-extension';
import { SupabaseService } from '../../../services/supabase.service';
import { from, Observable } from 'rxjs';
import { UserDto } from '../../../models/UserDto';

@Component({
  selector: 'app-user-profile-info',
  imports: [DatePipe],
  templateUrl: './user-profile-info.component.html',
  styleUrl: './user-profile-info.component.scss'
})
export class UserProfileInfoComponent implements OnInit {
  supabaseService = inject(SupabaseService);
  user = computedAsync( () => from(this.supabaseService.getCurrentUser()) as Observable<UserDto>);

  permissions = [
    {
      emoji: '📅',
      title: 'Reservierungen erstellen',
      description: 'Darf neue Reservierungen anlegen und bearbeiten'
    },
    {
      emoji: '📊',
      title: 'Einblicke',
      description: 'Hat Zugriff auf Dashboard-Statistiken'
    }
  ];

  // Bar Chart Data
  reservationsByHour = [
    { time: '08:00', value: 12 },
    { time: '09:00', value: 19 },
    { time: '10:00', value: 3 },
    { time: '11:00', value: 5 },
    { time: '12:00', value: 2 },
    { time: '13:00', value: 3 },
    { time: '14:00', value: 15 }
  ];

  // Donut Chart Data
  activeReservations = 300;
  completedReservations = 50;
  cancelledReservations = 100;

  async ngOnInit():  Promise<void> {
    await this.supabaseService.loadCurrentUser();
  }

  getUserName(email: string): string {
    return email.split('@')[0];
}

getUserInitials(email: string): string {
  const username = email.split('@')[0]; 
  const parts = username.split(/[.\-_]/); 
  const initials = parts.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
}

  get totalReservations(): number {
    return this.activeReservations + this.completedReservations + this.cancelledReservations;
  }

  

  get reservationStatus() {
    return [
      { label: 'Aktiv', value: this.activeReservations, color: '#4CAF50' },
      { label: 'Abgeschlossen', value: this.completedReservations, color: '#2196F3' },
      { label: 'Storniert', value: this.cancelledReservations, color: '#F44336' }
    ];
  }

  get hasDashboardAccess(): boolean {
    return false; //this.permissions.some(p => p.title === 'Einblicke');
  }

  getDonutValue(value: number): string {
    const circumference = 2 * Math.PI * 80;
    const percentage = (value / this.totalReservations) * circumference;
    return `${percentage} ${circumference}`;
  }
  getDonutSegment(value: number): string {
    const circumference = 2 * Math.PI * 80;
    const percentage = value / this.totalReservations;
    return `${percentage * circumference} ${circumference}`;
  }

  getRotationAngle(type: 'completed' | 'cancelled'): number {
    let angle = -90; // Start at top (12 o'clock)
    
    if (type === 'completed') {
      angle += this.activeReservations / this.totalReservations * 360;
    }
    else if (type === 'cancelled') {
      angle += (this.activeReservations + this.completedReservations) / this.totalReservations * 360;
    }
    
    return angle;
  }
}
