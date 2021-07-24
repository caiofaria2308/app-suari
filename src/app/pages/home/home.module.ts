import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  imports: [
    HomeRoutingModule,
    NzTableModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
