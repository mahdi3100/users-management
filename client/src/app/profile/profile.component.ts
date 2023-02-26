import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from '../register/register.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends RegisterComponent {

  public firstname: string | null | undefined;
  public email: string | null | undefined;
  public role: string | null | undefined;
  public lastname: string | null | undefined;
  public comments: Object[] | undefined;

  public loadingDeleteUser = false;
  public loadingshowProfile = true;

  public isEditBoxVisible = false;
  public loadingEdit = false;
  public errorEditUser: String | null = null;

  constructor(private profileservice: ProfileService,
    private route: ActivatedRoute,
    protected override router: Router,
    protected override registerservice: RegisterService,//or can change name without override
    protected override authservice: AuthService//or can change name without override
  ) {
    super(registerservice, authservice, router)
  }

  override ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.firstname = params.get('firstname')
      this.getProfile()
    })
  }

  getProfile() {
    //get Id or firstname 

    if (this.firstname) {
      this.loadingshowProfile = true;
      this.profileservice.getProfile(this.firstname).subscribe({
        next: (userInfo) => {
          this.lastname = userInfo.lastname;
          this.email = userInfo.email;
          this.role = userInfo.role;

        },
        complete: () => {

          this.loadingshowProfile = false;
        },
        error: (error) => {
          //not found
          //redirect 404
          if (error.statusText === "Unauthorized") {
            this.authservice.logout();
            return;
          }
          this.router.navigate(["/home"])
        }
      })

      //else redirect 404
    }
  }
  deleteUser() {
    this.loadingDeleteUser = true;
    if (this.firstname)
      this.profileservice.deleteUser(this.firstname).subscribe({
        next: (data) => {
          this.loadingDeleteUser = false;
          this.router.navigate(["/home"])
        },
        complete: () => {


        },
        error: (error) => {
          //not found
          //redirect 404
          if (error.statusText === "Unauthorized") {
            this.authservice.logout();
            return;
          }
          this.router.navigate(["/home"])
        }

      })
  }


  /**
   * Edit User
   */
  public editProfileBox(edituserFrom: NgForm): void {

    if (!this.firstname) return;

    if (!edituserFrom.valid) {
      this.errorEditUser = "Form is not Valid";
      return;
    }

    this.loadingEdit = true;
    // fetch data from API
    this.profileservice.editUser(this.firstname, edituserFrom.value).subscribe({
      next: () => {
        this.loadingEdit = false;

        this.toggleUserBox()

      },
      error: (error) => {
        //not found
        //redirect 404
        if (error.statusText === "Unauthorized") {
          this.authservice.logout();
          return;
        }
        this.router.navigate(["/home"])
      }
    })
  }



  public toggleUserBox(): void {
    this.isEditBoxVisible = !this.isEditBoxVisible;
  }
}
