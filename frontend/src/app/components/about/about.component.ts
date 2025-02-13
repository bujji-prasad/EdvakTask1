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
    navigateTo(page: string) {
      if (page === 'signup') {
        console.log('Navigating to signup...');
        window.location.href = '/signup'; 
      } else if (page === 'login') {
        console.log('Navigating to login...');
        window.location.href = '/login'; 
      }
    }
  }
