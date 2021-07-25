import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import {HomeService} from './home.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  constructor(
    private homeService: HomeService,
    private api_util: AppService
  ) { 
  }

  person_list: Person[] = new Array
  loading_table = true
  types_list = new Array
  ngOnInit() {
    this.load_types()
  }

  load_types(){
    this.homeService.getTypes().subscribe(
      (data: any) => {
        data.forEach((element: any) => {
          this.types_list[element.id] = element.name          
        });

        this.load_person()
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }
  load_person(){
    this.homeService.getPerson().subscribe(
      (data: any) => {
        data.forEach((element: any) => {
          let date = new Date(element.last_update)
          var p: Person = {
            id: element.id,
            name: element.name ,
            phone: element.phone,
            type: this.types_list[element.type],
            cpf: element.cpf,
            company: element.company,
            last_update: `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ` 
          }
          this.person_list.push(p)
        });
        this.loading_table = false

      },(error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

}



interface Person {
  id: number,
  name: string,
  type: string,
  cpf: string,
  phone: string,
  company: string,
  last_update: string
}

interface PersonType {
  id: number,
  name: string
}
