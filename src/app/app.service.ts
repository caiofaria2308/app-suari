import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  verify_login(): any{
    var token = sessionStorage.getItem('token')
    if(token == null){
      return false
    }
    return true
  }
  login(form: any){
    
    var url = `${localStorage.getItem('url_api')}auth/`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(url, form, httpOptions)
  } 
}
