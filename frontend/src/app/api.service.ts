import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  addUserApi(user : any)  :  Observable<any>{
    console.log(user);
    return this.http.post("http://localhost:3000/add" , user)
  }
}
