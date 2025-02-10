import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone : true,
})
export class LoginComponent {
  loginUser = {email : "", password : ""}
  onSignin(){
    console.log(this.loginUser.email,this.loginUser.password);
  }
}
