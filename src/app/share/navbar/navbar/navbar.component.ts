import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  avatar = window.sessionStorage.getItem('avatar');
  name = window.sessionStorage.getItem('name');
  role = window.sessionStorage.getItem('role');
  roleAdmin = window.sessionStorage.getItem('role')==='ROLE_ADMIN';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  public logout(): void {
    this.authService.logOut().subscribe();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload();
      console.log(this.avatar);
    });
  }
}
