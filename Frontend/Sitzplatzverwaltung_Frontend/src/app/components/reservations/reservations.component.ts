import { Component, inject, input, OnInit } from '@angular/core';
import { SeatComponent } from "../seat/seat.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {  map } from 'rxjs';
import { SeatDto } from '../../../models/SeatDto';

@Component({
  selector: 'app-reservations',
  imports: [SeatComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit{
private activatedRoute = inject(ActivatedRoute);
seats = toSignal<SeatDto[]>(this.activatedRoute.data.pipe(map(x => x['seats'])));
seatRows: SeatDto[][] = [];

ngOnInit(): void {
 this.seatRows = this.groupSeatsByRow();
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
}
