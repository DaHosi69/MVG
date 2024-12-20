import { Component, input, output } from '@angular/core';
import { SeatDto } from '../../../../models/SeatDto';

@Component({
  selector: 'app-seat',
  imports: [],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss'
})
export class SeatComponent {
seat = input.required<SeatDto>();
seatChanged = output<SeatDto>();

  changeSeatStatus() {
    let alteredSeat = this.seat();
    alteredSeat.is_occupied = !this.seat().is_occupied;
    this.seatChanged.emit(this.seat());
  }
}
