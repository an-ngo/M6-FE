import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderInfoComponent} from "./order-info/order-info.component";

const routes: Routes = [
  {path: 'order-info/:id', component: OrderInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
