import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { PersonService } from './person.service'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {


  list = new Array
  type_list = new Array
  tmp_type = new Array
  loading_table = true
  visible = false;
  is_update = false
  labbel_button = "Cadastrar pessoa"
  message_submit = ""

  last_id = 0
  last_name = ""
  last_type = 0
  last_cpf = ""
  last_phone = ""
  last_company = ""

  isLoadingForm = false
  validateForm!: FormGroup;

  
  constructor(
    private app: PersonService,
    private fb: FormBuilder,
    private api_util: AppService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      phone: [null, []],
      company: [null, [Validators.required]],
    });

    this.load_type()
  }

  load_type(){
    this.loading_table = true
    this.list = new Array
    this.type_list = new Array
    this.tmp_type = new Array
    this.app.get_all_type().subscribe(
      (data: any) => {
        data.forEach((element: any) => {
          this.type_list.push(element)
          this.tmp_type[element.id] = element.name
        });
        this.load_person()
      },(error: any) => {
        console.log(error)
      }
    )
  }
  

  load_person(){
    this.app.get_all_person().subscribe(
      (data: any) => {
        data.forEach((element: any) => {
          this.list.push({
            id: element.id,
            name: element.name,
            cpf: element.cpf,
            phone: element.phone,
            company: element.company,
            type: this.tmp_type[element.type]
          })          
        });
        this.loading_table = false
      }
    )
      
  }
  update(id: any) {
    this.is_update = true
    this.last_id = id
    this.labbel_button = "Atualizar pessoa"
    this.app.get_person_by_id(id).subscribe(
      (data: any) => {
        this.last_name = data.name
        this.last_phone = data.phone
        this.last_type = data.type
        this.last_cpf = data.cpf
        this.last_company = data.company
      }, (error: HttpErrorResponse) => {
        console.log(error)      }
    )
    this.visible = true
  }


  create(): void {
    this.is_update = false
    this.last_id = 0
    this.labbel_button = "Cadastrar pessoa"
    this.visible = true;
  }


  close(): void {
    this.visible = false;
  }


  submitForm(): void {
    this.isLoadingForm = true
    this.message_submit = ""
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if(this.validateForm.valid){
      if(!this.is_update){
        this.app.create(this.validateForm.value).subscribe(
          (data: any) => { 
              this.load_type()
              this.load_person()
              this.isLoadingForm = false
              this.close()
          },(error: HttpErrorResponse) => {
              this.isLoadingForm = false
              this.message_submit="Erro ao cadastrar pessoa"
              console.log(error)
          }
        )
      }else{
        this.app.update(this.validateForm.value, this.last_id).subscribe(
          (data: any) => {
              this.load_type()
              this.load_person()
              this.isLoadingForm = false
              this.close()
          },(error: HttpErrorResponse) => {
            this.isLoadingForm = false
              this.message_submit=`Erro ao cadastrar, verifique os dados`
          }
        )
      }
    }
  }

}

