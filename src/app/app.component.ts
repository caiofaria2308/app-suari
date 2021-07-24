import { Component } from '@angular/core';
import { AppService } from './app.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  validateForm!: FormGroup;
  isCollapsed = false;
  isLogged = false;
  error_message = ""

  constructor (
    private app: AppService,
    private fb: FormBuilder
    ) {}

  ngOnInit(){

    localStorage.setItem('url_api', 'http://api-suari.herokuapp.com/')
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  submitForm(): void {
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
      },
      (error: HttpErrorResponse) => {
        if(error.status == 401){
          this.error_message = "Usuário/Senha incorreta"
        }
      }
    )
  }
  
}
