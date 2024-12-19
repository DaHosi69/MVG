import {Component, computed, inject, input, numberAttribute, OnInit, output, signal} from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  private router = inject(Router);
  concertId = input.required<number>();
  name = input.required<string>();
  totalSeats = input.required<number>();
  date = input.required<string>();
  deleteConcert = output<number>();
  supabaseService = inject(SupabaseService);
  occupiedSeats = signal<number>(0);
  protected readonly Math = Math;
  deleteClick(){
    this.deleteConcert.emit(this.concertId());
  }
  ngOnInit(): void {
    this.fetchOccupiedSeats();
  }

  async fetchOccupiedSeats() {
    try {
      const count = await this.supabaseService.getOccupiedSeatsCount(this.concertId());
      this.occupiedSeats.set(Number(count) || 0);
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
      this.occupiedSeats.set(0);
    }
  }

  viewSeats() {
    this.router.navigateByUrl(`/reservations/${this.concertId()}`);
  }
}
