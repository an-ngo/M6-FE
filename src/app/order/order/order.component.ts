import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  provider: any;
  order: any = null;
  services: any[] = [];

  constructor(private orderService: OrderService, private activatedRouter: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.userService.findUserById(id).subscribe((data) => {
        this.provider = data;
        console.log(this.provider);
      });
    });
  }
  public createOrder(orderForm: any): void {
    orderForm.value.serviceByProviderList = this.services;
    orderForm.value.userProvider = this.provider;
    console.log(orderForm.value);
    this.orderService.createOrder(orderForm.value).subscribe((data) => {
      this.order = data;
      console.log(this.order);
    })

  }
  public selectService(service: any): void {
    for (let i = 0; i < this.services.length; i++){
      if (this.services[i] == service){
        this.services.splice(i, 1);
        console.log(this.services);
        return;
      }
    }
    this.services.push(service);
    console.log(this.services);
  }
}
