import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  contactForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    username : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })
  status: string = 'Please fill in the form to Register!';

  validation_messages = {
    'password':[
      {type: 'required',message: 'This field is not be blank!'},
      {type: 'minlength', message: 'Password more than 6 characters!'},
    ],
    'email':[
      {type: 'required',message: 'This field is not be blank!'},
      {type:'pattern',message: 'Email invalidate' }
    ],
    gender: [{

    }]
  };
  ngOnInit(): void {
  }
  public register(registerForm: any): void {
    registerForm.value.avatar = this.urlImage;
    this.userService.register(registerForm.value).subscribe((data) => {
      this.message = "Đăng Ký Thành Công";
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
