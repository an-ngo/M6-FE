import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {ProviderComponent} from "./provider/provider.component";

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'provider/:id', component: ProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
