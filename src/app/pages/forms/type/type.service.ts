import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  url_api = localStorage.getItem('url_api')
  token = sessionStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };
  constructor(private http: HttpClient) { }
  getTypes(){
    var url = `${this.url_api}api/v1/person-type/`
    return this.http.get(url, this.httpOptions)
  }

  getTypeByID(id: any){
    var url = `${this.url_api}api/v1/person-type/${id}/`
    return this.http.get(url, this.httpOptions)
  }

  createType(form: any){
    var url = `${this.url_api}api/v1/person-type/`
    return this.http.post(url, form, this.httpOptions)
  }

  updateType(form:any, id: any){
    var url = `${this.url_api}api/v1/person-type/${id}/`
    return this.http.put(url, form, this.httpOptions)
  }

}
