import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public logout(): void {
    window.sessionStorage.clear();
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload();
    });
    console.log(this.avatar);
  }
}
