import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderInfoComponent } from './order-info/order-info.component';
import {OrderComponent} from "./order/order.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderComponent,
    OrderInfoComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
