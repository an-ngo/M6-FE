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
        this.eventSource = new EventSource(`${environment.URL_API}/messages/subscribe?roomId=${this.room.id}`);
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
    messageForm.value.user = this.currentUser;
    messageForm.value.room = this.room;
    this.messageService.saveMessage(messageForm.value, this.room.id).subscribe();
    this.messageService.createMessage(messageForm.value).subscribe();
    this.mes = "";
    this.event();
  }
  public event(): void {
    // @ts-ignore
    this.eventSource.addEventListener("sendmess", (data) => {
      // @ts-ignore
      console.log(JSON.parse(data.data));
      // @ts-ignore
      this.message = JSON.parse(data.data);
      this.messages.push(this.message);
    });
  }
}
