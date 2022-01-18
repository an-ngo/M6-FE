import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../service/order/order.service";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  order: any;
  username: any;

  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService) {
    this.username = window.sessionStorage.getItem("username");
    console.log(this.username);
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      console.log(id);
      this.orderService.findById(id).subscribe((data) => {
        this.order = data;
        console.log(this.order);
      });
    });
  }

  public confirm(check: any): void {
    if (check){
      this.orderService.confirmOrder(this.order.id).subscribe((data) => {
        this.order = data;
      })
    }
    else {
      this.orderService.deleteOrder(this.order.id).subscribe();
    }
  }

  public complete(){
    this.orderService.completeOrder(this.order.id).subscribe();
  }
}
