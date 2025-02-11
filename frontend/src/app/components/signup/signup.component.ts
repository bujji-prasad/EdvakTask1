import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, UrlSegment } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone : true
})
export class SignupComponent {
  user = {first_name : "" , last_name : "" , email : "", password : ""}
  constructor(private apiService : ApiService) {}
  onSignup(){
    console.log(this.user);
    this.apiService.addUserApi(this.user).subscribe((response) => {
      console.log("user added successfully");
    }, (error) => {
      console.log("error while addding the user" , error);
    })
  }
}
