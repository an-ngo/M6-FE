import { Component, OnInit } from '@angular/core';
import {HobbyService} from "../../service/hobby/hobby.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  files: File[] = [];
  hobbies: any[] = [];
  services: any[] = [];
  hobbiesSelect: any[] = [];
  urlImages: string[] = [];
  ref: any;
  lat = 0;
  lon = 0;


  constructor(private hobbyService: HobbyService, private storage: AngularFireStorage, private userService: UserService, private router: Router) {
    this.showInfos();
  }

  ngOnInit(): void {

    this.hobbyService.findAllHobby().subscribe((data) => {
      this.hobbies = data;
    }, (error => {
      console.log(error);
    }));
  }

  public createProvider(createProviderForm: any): void {
    createProviderForm.value.imageList = this.urlImages;
    createProviderForm.value.hobbyList = this.hobbiesSelect;
    createProviderForm.value.serviceByProviderList = this.services;
    console.log(createProviderForm.value);
    this.userService.registerProvider(createProviderForm.value).subscribe((data) => {
      console.log(data);
      window.sessionStorage.setItem("role", "ROLE_PROVIDER");
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    }, (error) => {
      alert(error);
    })
  }
  public addService(service: any): void {
    for (let i = 0; i < this.services.length; i++){
      if (this.services[i] == service || service == ""){
        return;
      }
    }
    this.services.push(service);
  }
  public selectHobby(id: any){
    for (let i = 0; i < this.hobbiesSelect.length; i++){
      if (this.hobbiesSelect[i].id == id){
        this.hobbiesSelect.splice(i, 1);
        console.log(this.hobbiesSelect);
        return;
      }
    }
    let hobby = {"id": id};
    this.hobbiesSelect.push(hobby);
  }
  public getImages(event: any){
    console.log(event.target.files);
    this.files = event.target.files;
    this.onload();
  }
  public onload(): void {
    for (let i = 0; i < this.files.length; i++){
      const id = Math.random().toString(36).substring(2);
      this.ref = this.storage.ref(id);
      this.ref.put(this.files[i]).then((snapshot: any) => {
        return snapshot.ref.getDownloadURL();
      }).then((downloadURL: any) => {
        this.urlImages.push(downloadURL);
      })
    }
  }

  public successHandler(position: any)  {
    console.log(position);
    this.lat = position.coords.latitude;
    console.log(this.lat);
    this.lon = position.coords.longitude;
    console.log(this.lon);
  }

  public errorHandler(positionError: any)  {
    if(positionError.code == 1) {
      alert("Error: Permission Denied! " + positionError.message);
    } else if(positionError.code == 2) {
      alert("Error: Position Unavailable! " + positionError.message);
    } else if(positionError.code == 3) {
      alert("Error: Timeout!" + positionError.message);
    }
  }

  public showInfos()  {
    let options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.successHandler, this.errorHandler, options);
  }
}
