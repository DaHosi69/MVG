import {Component, input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
name = input.required<string>();
totalSeats = input.required<number>();
occupiedSeats = input.required<number>();
date = input.required<string>();
}
