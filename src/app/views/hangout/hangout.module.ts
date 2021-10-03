import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HangoutRoutingModule } from './hangout-routing.module';
import { HangoutComponent } from './hangout.component';


@NgModule({
  declarations: [
    HangoutComponent
  ],
  imports: [
    CommonModule,
    HangoutRoutingModule
  ]
})
export class HangoutModule { }
