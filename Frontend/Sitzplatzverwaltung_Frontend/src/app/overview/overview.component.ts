import { Component } from '@angular/core';
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Concert} from "../../models/Concert";
import {CardComponent} from "../card/card.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [FormsModule, CardComponent, SidebarComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  concerts : Concert[] = [
    {id: 1, name: 'Wunschkonzert', date: '2024-11-20', totalSeats: 500, occupiedSeats: 350 },
    {id: 2, name: 'OpenAir', date: '2024-11-25', totalSeats: 300, occupiedSeats: 200 },
    {id: 3, name: 'Irgendans', date: '2024-12-01', totalSeats: 300, occupiedSeats: 20 },
  ];

}
