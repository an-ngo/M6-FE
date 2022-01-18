import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from "./user/user.component";
import { ProviderComponent } from './provider/provider.component';


@NgModule({
  declarations: [
    UserComponent,
    ProviderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
