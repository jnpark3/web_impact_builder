import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent{

  constructor(private appService: AppService, private router: Router) {}

  destroy$: Subject<boolean> = new Subject<boolean>();

  error = false;
  loading = false;
  error_statement = "";
  popup = false;

  login() {
      const username = (<HTMLInputElement>document.getElementById("username-input")).value
      const password = (<HTMLInputElement>document.getElementById("password-input")).value
      this.loading = true;
      try{
        this.appService.loginUser(username, password).pipe(takeUntil(this.destroy$)).subscribe((data : any) => {
          console.log(data)
            if (data.success) {
              console.log("LOGIN SUCCESSFUL " + data.payload)
              this.appService.addToken(data.payload);
              this.router.navigate(["/menu"]);
            } else {
              this.error = true;
              this.error_statement = data.payload;
            }
          });
      }
      catch(e){
        this.loading = false;
        this.error = true;
        this.error_statement = "Currently experiencing network difficulties. Please try again later."
      }
  }
}
