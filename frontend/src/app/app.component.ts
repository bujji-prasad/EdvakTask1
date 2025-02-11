import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
// import { LoginComponent } from './components/login/login.component';
// import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
