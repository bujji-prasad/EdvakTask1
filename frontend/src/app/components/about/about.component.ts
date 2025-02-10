import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone : true
})
export class AboutComponent {

}
