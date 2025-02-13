import { Component } from '@angular/core';
import { HomeheaderComponent } from '../homeheader/homeheader.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-home',
  imports: [HomeheaderComponent , TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone : true
})
export class HomeComponent {

}
