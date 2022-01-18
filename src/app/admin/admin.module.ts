import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from "./admin/admin.component";
import { ListOrderComponent } from './list-order/list-order.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

  ]
})
export class AdminModule { }
