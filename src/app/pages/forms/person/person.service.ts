import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url_api = localStorage.getItem('url_api')
  token = sessionStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };
  constructor(private http: HttpClient) { }

  get_all_type(){
    var url = `${this.url_api}api/v1/person-type/`
    return this.http.get(url, this.httpOptions)
  }

  get_all_person(){
    var url = `${this.url_api}api/v1/person/`
    return this.http.get(url, this.httpOptions)
  }

  get_person_by_id(id: any){
    var url = `${this.url_api}api/v1/person/${id}/`
    return this.http.get(url, this.httpOptions)
  }

  create(form: any) {
    var url = `${this.url_api}api/v1/person/`
    return this.http.post(url, form, this.httpOptions)
  }

  update(form: any, id: any) {
    var url = `${this.url_api}api/v1/person/${id}/`
    return this.http.put(url, form, this.httpOptions)
  }

  get_photos_by_id(){
    var url = `${this.url_api}api/v1/person-media/`
    return this.http.get(url, this.httpOptions)
  }
}
