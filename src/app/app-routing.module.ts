import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(modules => modules.HomeModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(modules => modules.AdminModule)
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(modules => modules.UserModule)
  },
  {
    path: 'order', loadChildren: () => import('./order/order.module').then(modules => modules.OrderModule)
  },
  {
    path: 'app', loadChildren: () => import('./auth/auth.module').then(modules => modules.AuthModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
