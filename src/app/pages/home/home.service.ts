import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  getPerson(): any{
      var url = localStorage.getItem('url_api') + 'api/v1/person'
  }
}

