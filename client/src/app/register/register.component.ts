import { Component, OnInit } from '@angular/core';
import { RegisterService } from "./register.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errorSignIn: string = "";
  public errorSignUp: string = "";
  public password: string | undefined;

  public stateInput = ""
  public loadingSign: Boolean = false;
  UPIN: Boolean = true;

  constructor(
    protected registerservice: RegisterService,
    protected authservice: AuthService,
    protected router: Router,
  ) {


    /**
     * Redirect to Home in case refresh page or redirected to root /
     */

    if (this.authservice.getUserAuthentification()?.firstname) {
      this.router.navigate(['/home']);
    }
  }

  //
  ngOnInit(): void {
    //init form
  }
  //should be ovservator
  signup(f: NgForm): void {
    /* let credential = this.registerservice.signup(f)
     if(credential)
      this.authservice.logging(true,f.value);*/


    if (!f.valid) {
      this.errorSignUp = "Form is not Valid";
      return;
    }

    this.loadingSign = true;
    this.registerservice.signup(f.value).subscribe(data => {

      this.loadingSign = false;
      if (data.error == 1) {
        return this.errorSignUp = data.txt;
      }

      this.authservice.logging(true, data.user);

    })
  }

  signin(f: NgForm) {

    if (!f.valid) {
      this.errorSignIn = "Form is not Valid";
      return;
    }

    this.loadingSign = true;
    // fetch data from API
    this.registerservice.signin(f.value).subscribe(data => {
      this.loadingSign = false;

      if (data.error == 1) {
        return this.errorSignIn = data.txt;
      }
      if (data.credential)
        this.authservice.logging(true, data.user);
      else
        this.errorSignIn = "Credentials are not Valid";
    })
  }

  public checkPassword(e: Event): string {

    if (!this.password) return "";
    if (this.password == "") {
      return "";
    }
    else if (this.password.length < 4) {

      return this.stateInput = "is-danger";

    } else if (this.password.length < 8) {

      return this.stateInput = "is-warning";

    } else {
      return this.stateInput = "is-success";
    }

  }
  toggleSign(): void {
    this.UPIN = !this.UPIN;
  }



}
