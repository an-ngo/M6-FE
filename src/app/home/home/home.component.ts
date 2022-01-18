import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../service/home/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title_top: string = 'Recently added Profile';
  providers: any[] = [];
  totalPage: any;
  page = 0;
  action: any = '';
  searchForm: any;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.findAllProvider(this.page);
  }
  public findAllProvider(page: any): void {
    this.homeService.findAllProviders(page).subscribe((data) => {
      this.providers = data.content;
      this.totalPage = data.totalPages;
    });
  }
  public getTop6ProviderHot(): void {
    this.homeService.getTop6ProviderHot().subscribe((data) => {
      this.providers = data;
    });
    this.title_top = 'Top Provider Hot'

  }
  public getTop12CountTime(): void {
    this.homeService.getTop12CountTime().subscribe((data) => {
      this.providers = data;
    });
    this.title_top = 'Top Provider Count Time'
  }
  public getTop12JoinDate(): void {
    this.homeService.getTop12JoinDate().subscribe((data) => {
      this.providers = data;
    });
    this.title_top = 'Recently Added Provider'
  }
  public getTop6ViewPage(): void {
    this.homeService.getTop6ViewPage().subscribe((data) => {
      this.providers = data;
    });
    this.title_top = 'Most View Provider'
  }
  public nextPage(checkPage: any){
    if (checkPage){
      this.page++;
    }
    else {
      this.page--;
    }
    switch (this.action){
      case "search": this.getSearch(this.searchForm, this.page); break;
      default: this.findAllProvider(this.page);
    }
  }
  public checkBox(event: any): void {
    this.action = event.target.value;
    switch (this.action){
      case "top6ProviderHot" : this.getTop6ProviderHot(); break;
      case "top12CountTime" : this.getTop12CountTime(); break;
      case "top12JoinDate" : this.getTop12JoinDate(); break;
      case "top6ViewPage" : this.getTop6ViewPage(); break;
      default : this.page = 0; this.findAllProvider(this.page); break;
    }
  }
  public searchProvider(searchForm: any): void {
    this.action = "search";
    this.searchForm = searchForm.value;
    this.page = 0;
    this.getSearch(this.searchForm, this.page);
  }
  public getSearch(searchForm: any, page: any): void {
    this.homeService.search(searchForm, page).subscribe((data) => {
      this.providers = data.content;
      this.totalPage = data.totalPages;
      console.log(this.providers);
    })
  }
}
