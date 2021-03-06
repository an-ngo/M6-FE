import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from "./user/user.component";
import { ProviderComponent } from './provider/provider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import { EditServiceComponent } from './edit-service/edit-service.component';

@NgModule({
  declarations: [
    UserComponent,
    ProviderComponent,
    RegisterComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
  ]
})
export class UserModule { }
