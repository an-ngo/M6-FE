import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../service/order/order.service";
import {documentId} from "@angular/fire/firestore";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  order: any;
  username: any;
  status: boolean = false;
  id: any;
  comment:any;
  feedback:any;


  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService) {
    this.username = window.sessionStorage.getItem("username");
    console.log(this.username);
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      console.log(id);
      this.id = id;
      this.orderService.findById(id).subscribe((data) => {
        this.order = data;
        console.log(this.order);
      });
    });
    this.status = this.order.userProvider.username == this.username && this.order.statusOrder == 'RECEIVED';
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
    this.orderService.completeOrder(this.order.id).subscribe((data)=>{
      console.log(data);
      // window.location.reload();
    });

  }



  sendFeedbackToUser(comment: string) {
    this.order.comment = comment;
    console.log(this.order)
    this.orderService.sendCommentOrFeedback(this.id,this.order).subscribe((data)=>{
      console.log(data);
      // window.location.reload();
    })
  }

  sendCommentToProvider() {
    const e = document.getElementById("comment");
    console.log(e)

    this.orderService.sendCommentOrFeedback(this.id,this.order).subscribe((data2)=>{
      console.log(data2);
    });
  }
}
