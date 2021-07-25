import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HomeService {
  token = sessionStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) { 
    
  }
  
  getPerson(){
      var url = localStorage.getItem('url_api') + 'api/v1/person/'
      
      return this.http.get(url, this.httpOptions)
  }
  getTypes(){
    var url = localStorage.getItem('url_api') + `api/v1/person-type/`
    return this.http.get(url, this.httpOptions)
  }
}

