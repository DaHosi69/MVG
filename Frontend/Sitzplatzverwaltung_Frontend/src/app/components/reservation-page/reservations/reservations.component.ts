import { Component, inject, OnInit, signal } from '@angular/core';
import { SeatComponent } from "../seat/seat.component";
import { ActivatedRoute } from '@angular/router';
import { SeatDto } from '../../../../models/SeatDto';
import { NavbarComponent } from "../navbar/navbar.component";
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-reservations',
  imports: [SeatComponent, NavbarComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit{
supabaseService = inject(SupabaseService);
private activatedRoute = inject(ActivatedRoute);
seats = signal<SeatDto[]>([]);
seatRows = signal<SeatDto[][]>([]);

  async ngOnInit(): Promise<void> {
    this.activatedRoute.data.subscribe((data) => {
      this.seats.set(data['seats'] || []);
    });
    this.seatRows.set(this.groupSeatsByRow());
    await this.supabaseService.loadCurrentUser();
  }

  groupSeatsByRow(): SeatDto[][] {
    if (!this.seats() || this.seats()!.length === 0) return [];

    return this.seats()!
      .sort((a, b) =>
        b.row_number === a.row_number
          ? a.seat_number - b.seat_number 
          : b.row_number - a.row_number 
      )
      .reduce((rows: SeatDto[][], seat) => {
        if (!rows.length || rows[rows.length - 1][0].row_number !== seat.row_number) {
          rows.push([]);
        }
        rows[rows.length - 1].push(seat);
        return rows;
    }, []);
  }

  
  seatChanged(seat: SeatDto): void {
    if (this.seats() !== undefined){ 
    this.seats.update((currentSeats) =>
      currentSeats.map((s) => (s.id === seat.id ? { ...s, ...seat } : s))
    );
  }
    this.groupSeatsByRow();
    this.saveChanges();
  }

  async saveChanges() {
    try {
      const updatedSeats = this.seats();
      await this.supabaseService.updateSeats(updatedSeats); 
      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  }
  
}
