import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProviderComponent} from "./provider/provider.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {
    path: 'provider/:id', component: ProviderComponent
  },
  {
    path: 'register/provider', component: RegisterComponent
  },
  {
    path: '', component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
