import { Component } from '@angular/core';
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Concert} from "../../models/Concert";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [FormsModule, CardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  concerts : Concert[] = [
    { name: 'Wunschkonzert', date: '2024-11-20', totalSeats: 500, occupiedSeats: 350 },
    { name: 'Konzertname 2', date: '2024-11-25', totalSeats: 300, occupiedSeats: 150 },
    { name: 'Konzertname 3', date: '2024-12-01', totalSeats: 200, occupiedSeats: 50 },
  ];

}
