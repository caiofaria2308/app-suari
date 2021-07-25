import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TypeMediaService} from './type-media.service'
import {AppService} from '../../../app.service'


@Component({
  selector: 'app-type-media',
  templateUrl: './type-media.component.html',
  styleUrls: ['./type-media.component.css']
})
export class TypeMediaComponent implements OnInit {

  list = new Array
  loading_table = true
  visible = false;
  is_update = false
  labbel_button = "Cadastrar tipo de mídia"
  message_submit = ""
  last_id = 0
  last_name = ""
  isLoadingForm = false
  validateForm!: FormGroup;


  constructor(
    private app: TypeMediaService,
    private fb: FormBuilder,
    private api_util: AppService
  ) { }


  ngOnInit(): void {
    this.load()

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]]
    });

  }


  load(){
    this.loading_table = true
    this.app.getTypes().subscribe(
      (data: any) => {
        this.list = data
        this.loading_table = false
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  update(id: any) {
    this.is_update = true
    this.last_id = id
    this.labbel_button = "Atualizar tipo de mídia"
    this.app.getTypeByID(id).subscribe(
      (data: any) => {
        this.last_name = data.name
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
    this.visible = true
  }


  create(): void {
    this.is_update = false
    this.last_name = ""
    this.last_id = 0
    this.labbel_button = "Cadastrar tipo de mídia"
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
        this.app.createType(this.validateForm.value).subscribe(
          (data: any) => { 
              this.load()
              this.isLoadingForm = false
              this.close()
          },(error: HttpErrorResponse) => {
              this.message_submit="Erro ao cadastrar tipo de mídia"
    
              console.log(error)
    
          }
        )
      }else{
        this.app.updateType(this.validateForm.value, this.last_id).subscribe(
          (data: any) => {
              this.load()
              this.isLoadingForm = false
              this.close()
          },(error: HttpErrorResponse) => {
              this.message_submit="Erro ao atualizar tipo de mídia"
    
              console.log(error)
    
          }
        )
      }
    }
  }

}
