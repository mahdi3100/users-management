import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from '../register/register.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * extend RegisterComponent  to validate inputes ; 
 */

export class HomeComponent extends RegisterComponent {

  public user: any;
  public allUsers: HomeComponent.AllUsers[];
  public loadingCSV: Boolean;
  public loadingAdd: Boolean;
  //public stateInput=""
  public errorimportCSV = "";
  public loaderAllUsers = false;
  public errorAllUsers: String | null = null;

  public errorAddUser: String | null = null;
  public isBoxVisible: Boolean = false;

  constructor(
    private homeservice: HomeService,
    private route: ActivatedRoute,
    protected override router: Router,
    protected override registerservice: RegisterService,//or can change name without override
    protected override authservice: AuthService//or can change name without override
  ) {
    super(registerservice, authservice, router)
    this.allUsers = []
    this.loadingCSV = false;
    this.loadingAdd = false;
  }



  override ngOnInit(): void {
    //init form
    if (localStorage.getItem("user"))
      // !! surely it will non-null assertion operator to tell typescript that you know what you are doing
      this.user = JSON.parse(localStorage.getItem("user")!) as User;
    this.getAllUsers()
    // this.importCSV()
  }
  getAllUsers() {

    this.loaderAllUsers = true;
    this.errorAllUsers = null;

    this.homeservice.getAllUsers().subscribe({
      next: (data) => {
        this.loaderAllUsers = false;

        if (data.error == 1) {
          return this.errorAllUsers = data.txt;
        }
        console.log(data.users)
        this.allUsers = data.users;
        console.log(this.allUsers)


      }, complete: () => {

      },
      error: (error) => {
        //Session ended|| does not exist
        if (error.statusText === "Unauthorized") {
          this.authservice.logout();
        }
      }
    })



  }



  public onUpload(event: Event): any {

    const target = event.target as HTMLInputElement;
    const files = target.files;
    let file: Blob;
    if (files) {
      try {
        file = files[0];
      } catch (e) {
        return this.errorimportCSV = "An error occured"
      }

    }
    const formData = new FormData();
    formData.append('file', file!);
    this.loadingCSV = true;
    this.errorimportCSV = ""
    this.homeservice.uploadCSV(formData)
      .subscribe({
        next: (newusers) => {

          this.loadingCSV = false;
          if (newusers.error == 1) {
            return this.errorimportCSV = newusers.txt
          }
          // this.allUsers = [...newusers.users,...this.allUsers]
          this.addUserUI(newusers.users)
        },
        complete: () => {

        },
        error: (error) => {
          if (error.statusText === "Unauthorized") {
            this.authservice.logout();
            return;
          }
          this.loadingCSV = false;
          this.errorimportCSV = 'Error uploading file', error.statusText
        }


      })



  }

  public addUserUI(users: any) {
    console.log(typeof users)
    if (users instanceof Array) {

      this.allUsers = [...users, ...this.allUsers]
    } else if (users instanceof Object) {

      this.allUsers = [users, ...this.allUsers]
      //this.allUsers.unshift(users)
    } else
      alert("Error user append")
  }
  public addProfileBox(adduserFrom: NgForm): void {

    /* let user =  {
       firstname:"mehdi",
       lastname:"mehdi",
       role:"mehdi ",
       email:"test@test.com",
       password:"test"
     }
     this.addUserUI(user);
     return */
    // fetch data from API
    if (!adduserFrom.valid) {
      this.errorAddUser = "Form is not Valid";
      return;
    }

    this.loadingAdd = true;
    // fetch data from API
    this.homeservice.addUser(adduserFrom.value).subscribe(data => {
      this.loadingAdd = false;

      if (data.error == 1) {
        return this.errorAddUser = data.txt;
      }
      this.toggleUserBox()
      this.addUserUI(data.user);

    })
  }



  public toggleUserBox(): void {
    this.isBoxVisible = !this.isBoxVisible;
  }

  public toProfile(event: Event, user: any) {
    //const target = event.target as HTMLButtonElement;
    // const attributeValue = target.getAttribute('data-attribute');
    if (!user.firstname) return;
    //this.router.navigate(['/profile'/*, { firstname: user.firstname}*/], {  queryParams:{ firstname: user.firstname}, relativeTo: this.route });

  }
}
namespace HomeComponent {
  /*export interface AllUsers {
    [index: number]: { id: number; pseudo: string; role: string };
}*/
  export interface AllUsers { id: number; firstname: string, lastname: string; role: string }
}