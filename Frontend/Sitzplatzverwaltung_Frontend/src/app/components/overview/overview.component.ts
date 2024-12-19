import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ConcertDto} from "../../../models/ConcertDto";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SupabaseService} from "../../../services/supabase.service";
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-overview',
  imports: [FormsModule, CardComponent, SidebarComponent],
  templateUrl: './overview.component.html',
  standalone: true,
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  supabaseService = inject(SupabaseService);
  concerts = signal<ConcertDto[]>([]);

  ngOnInit() {
    this.supabaseService.getConcerts().then(x => this.concerts.set(x));
  }

  deleteConcert($event: number) {

  }


}
