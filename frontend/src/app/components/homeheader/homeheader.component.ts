import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-homeheader',
  imports: [CommonModule ],
  templateUrl: './homeheader.component.html',
  styleUrl: './homeheader.component.scss'
})
export class HomeheaderComponent implements OnInit{

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  isModalOpen: boolean = false;
  

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  openModel(): void {
    this.isModalOpen = true;
    console.log("model opened")
  }

  closeModal(): void {
    this.isModalOpen = false;
    console.log("model closed")
  }

  logout() {
    this.router.navigate(["/login"])
  }

  fetchUserDetails(): void {
    this.apiService.getUser().subscribe(
      (response) => {
        console.log(`user detaisl from resposne : ${response.first_name}`)
        this.firstName = response.first_name;
        this.lastName = response.last_name;
        this.email = response.email;
        console.log(this.firstName,this.lastName,this.email)
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }


  

}
