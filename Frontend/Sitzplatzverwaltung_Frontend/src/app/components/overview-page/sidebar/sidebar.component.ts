import {Component, inject, input, signal} from '@angular/core';
import {Router} from "@angular/router";
import { SupabaseService } from '../../../../services/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
router = inject(Router);
supabaseService = inject(SupabaseService);
addConcertName = signal<string>('');
addConcertDate = signal<string>('');
addTotalSeats = signal<number>(1);
addSeatRows = signal<number>(1);
isInputValid = signal<boolean>(false);
role = input.required<string>();

  async logout(): Promise<void> {
    await this.supabaseService.logout();
    this.router.navigate(['/login']); 
  }

  async addConcertWithSeats() {
    try {
      await this.supabaseService.createConcertWithSeats(
        this.addConcertName(),
        this.addConcertDate(),
        this.addTotalSeats(),
        this.addSeatRows()  
      );
      console.log('Concert and seats added successfully!');
    } catch (error) {
      console.error('Error adding concert and seats:', error);
    }
    window.location.reload();
  }
  
  checkFormInput(){
   this.isInputValid.set(this.inputValid());
  }
  
  inputValid(): boolean {
    if (this.addConcertName() !== '' 
    && this.addConcertDate() !== '' 
    && this.addTotalSeats() > 0 
    && this.addSeatRows() > 0 
    && this.addTotalSeats() % this.addSeatRows() === 0)return true;
    return false;
  }

  resetForm() {
    this.addConcertName.set('');
    this.addConcertDate.set('');
    this.addTotalSeats.set(1);
    this.addSeatRows.set(1);
    this.isInputValid.set(false);
  }

  onInputChange(event: Event, signalSetter: (value: string) => void): void {
    const input = event.target as HTMLInputElement;
    signalSetter(input.value);
    this.checkFormInput();
  }

  navigateToMVGPage(){
    window.location.href = 'https://1491662368.jimdoweb.com';
  }

  profileClicked() {
    this.router.navigate(['userprofileinfo']);
  }
}
