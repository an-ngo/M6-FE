import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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
  constructor(private userService: UserService, private storage: AngularFireStorage) { }

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
}
