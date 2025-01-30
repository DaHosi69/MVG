import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-working-on-it-page',
  imports: [FormsModule],
  templateUrl: './working-on-it-page.component.html',
  styleUrl: './working-on-it-page.component.scss'
})
export class WorkingOnItPageComponent {
  router = inject(Router);
  back() {
    this.router.navigate(['overview']);
}

}
