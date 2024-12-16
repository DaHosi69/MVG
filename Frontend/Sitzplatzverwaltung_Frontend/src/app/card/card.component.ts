import {Component, input, OnInit, output} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  concertId = input.required<number>();
  name = input.required<string>();
  totalSeats = input.required<number>();
  occupiedSeats = input.required<number>();
  date = input.required<string>();
  deleteConcert = output<number>();
  protected readonly Math = Math;
  deleteClick(){
    this.deleteConcert.emit(this.concertId());
  }
  ngOnInit(): void {

  }


}
