import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AppModule } from '../../../app.module';



@NgModule({
  declarations: [
    TypeComponent
  ],
  imports: [
    AppModule
  ],
  exports: [TypeComponent]
})
export class TypeModule { }
