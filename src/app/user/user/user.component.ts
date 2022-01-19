import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {OrderService} from "../../service/order/order.service";

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

  constructor(private userService: UserService, private storage: AngularFireStorage, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.userService.findUserByToken().subscribe((data) => {
      this.user = data;
      this.urlImage = data.avatar;
      console.log(this.user);
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
  userOrders: any[]=[];
  isShowFormListUserBook = true;
  isShowFormBookProvider = true;

  checkBox(event: any) {
    this.action = event.target.value;
    console.log(this.action)
    switch (this.action) {
      case "showListUserBook" :
        this.getAllUserBooks();
        this.isShowFormListUserBook = true;
        this.isShowFormBookProvider = false;
        break;
      case "showListBookProvider" :
        this.getAllProviderBook();
        this.isShowFormListUserBook = false;
        this.isShowFormBookProvider = true;
        break;
      case "pendding" :
        this.getAllBookByStatus(this.action);   //minh book
        break;
      case "showPeopleBookThemselvesByStatus" :
        // @ts-ignore
        this.getAllStatusBook();    //ho book
        break;
      default : this.page = 0
    }

  }

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


  public getAllBookByStatus(status: any):void {
    this.orderService.findAllByStatusAndUser(status).subscribe((data) =>{
      this.orders = data;
    })
  }

  public getAllStatusBook(status : any): void {

  }
}
