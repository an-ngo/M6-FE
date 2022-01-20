import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../service/order/order.service";
import {RoomService} from "../../service/room/room.service";

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


  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService, private roomService: RoomService) {
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

  public confirm(check: any, name: any): void {
    if (check){
      this.orderService.confirmOrder(this.order.id).subscribe((data) => {
        this.order = data;
        const roomChat = {"name": name};
        this.roomService.create(roomChat).subscribe((data) => {
          this.order.room = data;
          this.orderService.editOrder(this.order.id, this.order).subscribe((data) => {
            console.log(data);
          });
        });
      });
    }
    else {
      this.orderService.deleteOrder(this.order.id).subscribe();
    }
  }

  public complete(){
    this.orderService.completeOrder(this.order.id).subscribe();
  }



  sendCommentToUser(e: any) {
    this.order.feedback = e.value;
    this.orderService.sendCommentOrFeedback(this.id,this.order).subscribe((data)=>{
      console.log(data);
    })
  }

  sendCommentToProvider(e: any) {
    this.order.comment = e.value;
    this.orderService.sendCommentOrFeedback(this.id,this.order).subscribe((data2)=>{
      console.log(data2);
    });
  }
}
