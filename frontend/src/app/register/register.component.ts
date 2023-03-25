import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  templateUrl: "register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent{

  constructor(private appService: AppService, private router: Router) {}

  destroy$: Subject<boolean> = new Subject<boolean>();

  error = false;
  loading = false;
  error_statement = "";

  register() {
      const username = (<HTMLInputElement>document.getElementById("username-input")).value
      const password = (<HTMLInputElement>document.getElementById("password-input")).value
      const firstname = (<HTMLInputElement>document.getElementById("first-name-input")).value
      const lastname = (<HTMLInputElement>document.getElementById("last-name-input")).value
      const email = (<HTMLInputElement>document.getElementById("email-input")).value
      if(!username){
        this.error = true
        this.error_statement = "Username is invalid";
        return
      }
      if(password.length < 3){
        this.error = true
        this.error_statement = "Password is Too Short";
        return
      }
      if(!firstname){
        this.error = true
        this.error_statement = "First name is required";
        return
      }
      if(!lastname){
        this.error = true
        this.error_statement = "Last name is required";
        return
      }
      if(!email){
        this.error = true
        this.error_statement = "Last name is required";
        return
      }
      this.error = false
      this.loading = true;
      try{
        this.appService.registerUser(firstname, lastname, email, username, password).pipe(takeUntil(this.destroy$)).subscribe((data : any) => {
          console.log(data)
            if (data.success) {
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
