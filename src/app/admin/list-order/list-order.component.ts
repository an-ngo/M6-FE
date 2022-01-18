import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {OrderService} from "../../service/order/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: any[] = [];
  totalPage: any;
  page = 0;
  action: any = '';


  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll(this.page);
  }

  public findAll(page: any){
    this.orderService.findAll(page).subscribe((data)=>{
      this.orders = data;
      this.totalPage=data.size;
      console.log(data);
    });
  }

  public nextPage(checkPage: any){
    if (checkPage){
      this.page++;
    }
    else {
      this.page--;
    }
    this.findAll(this.page);
  }

  navigateToOrder(id: any) {
    this.router.navigateByUrl(`/order/${id}`)
  }
}
