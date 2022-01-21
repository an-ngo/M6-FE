import {Component, DoCheck, OnInit} from '@angular/core';
import {MessageService} from "../../service/message/message.service";
import {RoomService} from "../../service/room/room.service";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  room: any;
  currentUser: any;
  messages: any[] = [];
  message: any;
  mes: any;
  eventSource: any;
  constructor(private messageService: MessageService, private roomService: RoomService, private userService: UserService, private activatedRouter: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((paraMap) => {
      const roomId = paraMap.get('roomId');
      this.roomService.findById(roomId).subscribe((data) => {
        this.room = data;
        // this.eventSource = new EventSource(`${environment.URL_API}/messages/subscribe?roomId=${roomId}`);
        this.messageService.getMessageByRoom(this.room).subscribe((data) => {
          this.messages = data;
        });
      });
    });
    this.userService.findUserByToken().subscribe((data) => {
      this.currentUser = data;
    });
  }

  public saveMessage(messageForm: any): void {
    let el = document.getElementById("sendMess");
    // @ts-ignore
    el.appendChild(document.createTextNode(this.currentUser.name+' '+messageForm.value.message));
    // @ts-ignore
    el.appendChild(document.createElement('br'));
    messageForm.value.user = this.currentUser;
    messageForm.value.room = this.room;
    this.messageService.saveMessage(messageForm.value, this.room.id).subscribe();
    this.messageService.createMessage(messageForm.value).subscribe();
    this.mes = "";
    this.event();
  }
  public event(): void {
    this.eventSource = new EventSource(`${environment.URL_API}/messages/subscribe?roomId=${this.room.id}`);
    // @ts-ignore
    this.eventSource.onmessage = (event) => {
      this.message = JSON.parse(event.data);
      let el = document.getElementById("sendMess");
      // @ts-ignore
      el.appendChild(document.createTextNode(this.message.user.name+' '+this.message.message));
      // @ts-ignore
      el.appendChild(document.createElement('br'));
    }
  }
}
