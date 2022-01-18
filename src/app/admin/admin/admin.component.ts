import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  totalPage: any;
  page = 0;
  action: any = '';


  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.findAll(this.page);
  }

  public findAll(page: any){
    this.adminService.findAll(page).subscribe((data)=>{
      this.users = data.content;
      this.totalPage=data.totalPages;
      console.log(data)
      for (let i = 0; i < this.users.length; i++) {
        for (const role of this.users[i].roles) {
          if(role.name=='ROLE_ADMIN'){
            this.users.splice(i,1);
            break;
          }
        }
      }
    });
  }

  public nextPage(checkPage: any){
    if (checkPage){
      this.page++;
    }
    else {
      this.page--;
    }
    this.findAll(this.page);
  }


}
