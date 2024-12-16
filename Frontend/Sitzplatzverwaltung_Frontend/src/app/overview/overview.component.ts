import {Component, inject} from '@angular/core';
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Concert} from "../../models/Concert";
import {CardComponent} from "../card/card.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [FormsModule, CardComponent, SidebarComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  supabaseService = inject(SupabaseService);
  concerts = this.supabaseService.getConcerts();

  deleteConcert($event: number) {
    let idx = this.concerts.findIndex(c => c.id === $event);
    this.concerts.splice(idx, 1);
  }
}
