import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone : true
})
export class SignupComponent {
  user = {firstName : "" , lastName : "" , email : "", password : ""}
  onSingup(){
    console.log(this.user.firstName,this.user.lastName,this.user.email,this.user.password);
  }
}
