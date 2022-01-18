import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderInfoComponent } from './order-info/order-info.component';
import {OrderComponent} from "./order/order.component";


@NgModule({
  declarations: [

    OrderComponent,
    OrderInfoComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
