import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../service/home/home.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  provider: any;

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
