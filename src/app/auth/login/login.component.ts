import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  public login(loginForm: any): void {
    this.authService.login(loginForm.value).subscribe((data)=>{
      window.sessionStorage.setItem("name", data.name);
      window.sessionStorage.setItem("username", data.username);
      window.sessionStorage.setItem("token", data.token)
      window.sessionStorage.setItem("avatar",data.avatar);
      for (let i = 0; i < data.roles.length; i++){
        window.sessionStorage.setItem("role", data.roles[i].authority);
      }
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    });
  }
}
