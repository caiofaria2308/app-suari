import { Component } from '@angular/core';
import { AppService } from './app.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  validateForm!: FormGroup;
  isCollapsed = false;
  isLogged = false;
  isLoadingLogin = false;
  error_message = ""
  username = ""

  constructor (
    private app: AppService,
    private fb: FormBuilder
    ) {}

  ngOnInit(){

    localStorage.setItem('url_api', 'https://api-suari.herokuapp.com/')
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.get_username()
  }
  submitForm(): void {
    this.isLoadingLogin = true
    this.username = ""
    this.error_message = ""
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.app.login(this.validateForm.value).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.access)
        sessionStorage.setItem('refresh', data.refresh)
        this.isLogged = true
        location.href = location.href
        this.get_username()
      },
      (error: HttpErrorResponse) => {
        if(error.status == 401){
          this.error_message = "Usuário/Senha incorreta"
        }
      }
    )
  }
  get_username(){
    var token = sessionStorage.getItem('token')
    if(token != null){
      var decode = jwt_decode(token)
      this.app.get_user(token, decode).subscribe(
        (data: any) => {
          this.username = data.username
        },
        (error: HttpErrorResponse) => {
          this.isLogged = false
          this.username = ""
          this.logout()
          console.log(error)
        }
      ) 
      this.isLogged = true
    }
  }
  logout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('refresh')
    this.username = ""
    this.isLogged = false
  }
  
}
