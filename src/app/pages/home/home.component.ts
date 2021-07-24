import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  

  constructor(
    private homeService: HomeService,
  ) { 
  }

  ngOnInit() {
    var person_list: Person[] = this.homeService.getPerson()
  }

}



interface Person {
  id: number,
  name: string,
  type: number,
  cpf: string,
  phone: string,
  company: string,
  last_update: string
}

interface PersonType {
  id: number,
  name: string
}
