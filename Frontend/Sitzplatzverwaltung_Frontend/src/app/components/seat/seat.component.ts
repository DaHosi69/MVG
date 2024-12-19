import { Component, input } from '@angular/core';

@Component({
  selector: 'app-seat',
  imports: [],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss'
})
export class SeatComponent {
isReserved = input.required<boolean>();
seatNumber = input.required<number>();
rowNumber = input.required<number>();
}
