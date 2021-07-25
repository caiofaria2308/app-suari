import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzTableModule,
    NzSpinModule,
    NzIconModule,
    NzDrawerModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
