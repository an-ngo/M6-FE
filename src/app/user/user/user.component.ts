import {Component, OnInit, Provider} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {OrderService} from "../../service/order/order.service";
import {ServiceService} from "../../service/service/service.service";
import {Router} from "@angular/router";
import {RoomService} from "../../service/room/room.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  checkEdit = false;
  urlImage: any;
  selectImage: any;
  ref: any;
  deleteId: any;
  element: any;
  deleteName: any;
  orders: any[] = [];
  title: string = '';
  page: number = 0;
  ordersUser: any[]=[]
  userOrders1: any[] = [];
  statusProvider : any = ''
  title_status: string = '';
  role = window.sessionStorage.getItem("role");
  rooms: any;
  checkMessage = false;

  constructor(private roomService: RoomService, private router: Router,private serviceService: ServiceService, private userService: UserService, private storage: AngularFireStorage, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.userService.findUserByToken().subscribe((data) => {
      this.user = data;
      this.urlImage = data.avatar;
      this.roomService.findAllByUserId(this.user.id).subscribe((data) => {
        this.rooms = data;
        console.log(this.rooms);
      });
    });
  }

  edit(): void {
    this.user.avatar = this.urlImage;
    console.log(this.user);
    this.checkEdit = false
    alert('success');
  }

  checkEditt() {
    this.checkEdit = true;
  }

  checkBack() {
    this.checkEdit = false;
  }

  selectAvatar(event: any) {
    this.selectImage = event.target.files[0];
    console.log(this.selectImage);
    this.onload();
  }

  public onload(): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.ref.put(this.selectImage).then((snapshot: any) => {
      return snapshot.ref.getDownloadURL();
    }).then((url: string) => {
      this.urlImage = url;
      console.log(this.urlImage);
    })
  }

  action: any = '';
  userOrders: any[] = [];
  isShowFormListUserBook = true;
  isShowFormBookProvider = true;
  isShowForm1: boolean = true;
  isShowForm2: boolean = true;
  status: any = {};
  // status = ["pending", "received", "complete"]


  checkBox(event: any) {
    this.action = event.target.value;
    console.log(this.action)
    switch (this.action) {
      case "showListUserBook" :
        this.getAllUserBooks();
        this.isShowFormListUserBook = true;
        this.isShowFormBookProvider = false;
        this.isShowForm1 = false;
        break;
      case "showListBookProvider" :
        this.getAllProviderBook();
        this.isShowFormListUserBook = false;
        this.isShowFormBookProvider = true;
        this.isShowForm1 = false;
        break;
    }
  }

  // public checkOption(stt: any) {
  //   this.getAllBookByStatus(stt);
  // }



  public getAllUserBooks(): void {
    this.orderService.findAllByUser().subscribe((data) => {
      this.orders = data;
    });
    this.title = 'List user book'
  }

  public getAllProviderBook(): void {
    this.orderService.findAllByProvider().subscribe((data) => {
      this.userOrders = data
    });
    this.title = 'List provider book'
  }


  public getAllBookByStatus(status: any): void {
    this.orderService.findAllByStatusAndUser(status).subscribe((data) => {
      if (status === 'pending') {
        this.ordersUser = data;
        console.log(this.ordersUser);
        this.title = 'Show List Book Provider "PENDING"'
      }
      if (status === 'received') {
        this.ordersUser = data;
        console.log(this.ordersUser);
        this.title = 'Show List Book Provider "RECEIVED"'
      }
      if (status === 'complete') {
        this.ordersUser = data;
        console.log(this.ordersUser);
        this.title = 'Show List Book Provider "COMPLETE"'
      }
      this.isShowFormBookProvider = false;
      this.isShowFormListUserBook = false;
      this.isShowForm1 = true;
      this.isShowForm2 = false;
    })
  }



  public getAllStatusBook(status: any): void {
    this.orderService.findAllByStatusAndUserProvider(status).subscribe((data) => {
      this.userOrders1 = data;
      console.log(data);
      if (status === 'pending') {
        this.title = 'Show list of people I book "PENDING"'
      }
      if (status === 'received') {
        this.title = 'Show list of people I book "RECEIVED"'
      }
      if (status === 'complete') {
        this.title = 'Show list of people I book "COMPLETE"'
      }

      this.isShowForm1= false;
      this.isShowForm2 = true;
    })
  }

  public changeStatusProvider(status: any): void {
    this.userService.changStatus(status).subscribe((data) => {
    this.status = data;
      if (status === 'active'){
        this.title_status = 'Thay đổi trạng thái CCDV -> hoạt động'
      }
      if (status === 'busy'){
        this.title_status = 'Thay đổi trạng thái CCDV -> thành bận'
      }
      if (status === 'disable'){
        this.title_status = 'Thay đổi trạng thái CCDV -> ngừng hoạt động'
      }
    });
    this.router.navigateByUrl('/user').then(() => {
      window.location.reload();
    });
  }

  soraTable() {
    this.checkMessage = true;
  }
}

