import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone : true,
})
export class LoginComponent {
  loginUser = {email : "", password : ""}

  errorMessage = ""
  constructor(private router : Router , private apiService : ApiService){}

  onSignin(){
    if(!this.loginUser.email || !this.loginUser.password){
      this.errorMessage = "both email and password are required";
      return 
    }
    else{
      this.apiService.loginUserApi(this.loginUser).subscribe((response) => {
        console.log(response.message)
        localStorage.setItem("jwtToken" , response.token)
        this.router.navigate(["/home"])
      } , (error) => {
        if(error.status === 400){
          this.errorMessage =  error.error.message || "Invalid credentials";
        }
        else {
          console.log(error)
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      })
    }
  }
}
