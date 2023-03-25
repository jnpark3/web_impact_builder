import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from '@angular/router';

@Component({
  selector: "notifications-root",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent {

  loading: boolean = true;
  empty: boolean = false;
  firstname: string = "";
  websites: any = [];
  notifications: any = [];

  constructor(private appService: AppService, private router: Router) {
    this.appService.verify().pipe().subscribe((data: any) => {
        console.log(data)
        if(!data.success){
          this.router.navigate(['/login'])
        }
        this.appService.getInfo().pipe().subscribe((data2: any) => {
          if(!data2.success){
            this.router.navigate(['/error'])
          }
          this.firstname = data2.payload.firstname
          this.websites = data2.payload.websites
          this.notifications = data2.payload.notifications
          this.loading = false;
      });
    });
  }

  logout(){
    this.appService.removeToken()
    this.router.navigate(["/login"]);
  }
}
