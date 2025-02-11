import { Component } from '@angular/core';
import { HomeheaderComponent } from '../homeheader/homeheader.component';

@Component({
  selector: 'app-home',
  imports: [HomeheaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone : true
})
export class HomeComponent {

}
