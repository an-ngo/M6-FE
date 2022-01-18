import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderInfoComponent} from "./order-info/order-info.component";


import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  {path: ':id', component: OrderComponent},
  {path: 'order-info/:id', component: OrderInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
