import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  urlImage: string = '';
  selectImage: any;
  ref: any;
  message: string = '';
  constructor(private storage: AngularFireStorage, private userService: UserService) { }

  ngOnInit(): void {
  }
  public register(registerForm: any): void {
    registerForm.value.avatar = this.urlImage;
    this.userService.register(registerForm.value).subscribe((data) => {
      this.message = data;
    });
  }
  public selectFile(event: any){
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
