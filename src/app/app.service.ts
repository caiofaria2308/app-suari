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
  refresh(){
    var url = `${localStorage.getItem('url_api')}auth/refresh`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('refresh')}`
      })
    };
    return this.http.post(url, httpOptions)
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

  get_user(token: any, token_decode: any){
    var url = `${localStorage.getItem('url_api')}api/v1/users/${token_decode.user_id}/`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(url, httpOptions)
  }
}
