import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../service/home/home.service";
import {ActivatedRoute} from "@angular/router";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  provider: any;
<<<<<<< HEAD
  customOptions: OwlOptions = {
    loop:true,
    margin:10,
    nav:true,
    dots:true,
    autoplay:true,
    autoplayTimeout:2000,
    stagePadding:50,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:3
      },
      1000:{
        items:5
      }
    }
  }
=======
  username = window.sessionStorage.getItem("username");
  role = window.sessionStorage.getItem("role");
>>>>>>> 5f02d8fa2c3e56e7bd83f47a40771c6223baf13a

  constructor(private homeService: HomeService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id')
      this.homeService.findProvider(id).subscribe((data) => {
        this.provider = data;
        console.log(this.provider);
      });
    });
  }



}
