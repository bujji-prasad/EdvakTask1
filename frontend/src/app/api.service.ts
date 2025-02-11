import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  addUserApi(user : any)  :  Observable<any>{
    console.log(user);
    return this.http.post("http://localhost:3000/add" , user)
  }

  loginUserApi(user : any) : Observable<any>{
    return this.http.post("http://localhost:3000/login" , user)
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    console.log(`jwt : ${token}`)
    if (!token) {
      console.error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/user', { headers });
  }
  
}
