import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { ListenerService } from './listener.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, AfterViewInit {


  public user:User|null=null;
  //Access template reference variables from component class
  @ViewChild('headerApp',{ static: true }) headerApp!: ElementRef
  headerContext={
  //  user: this.user,//null//{pseudo:"test tset"}
  };

  title = 'client';
  //public rr = "HHHHH"
  constructor(private auth:AuthService, private listener:ListenerService){
    this.listener.getEvent().subscribe(event => {
 
      this.user = event.user;
    });
    /*
    setTimeout(() => {
      this.rr = "false";
    }, 5000);
    */
  //no need this.isAuth = auth.getUserAuthentification();
  }

  ngOnInit(): void {

    /**
     * Case reload url , otherwise will get user by this.listener.getEvent()
     */
    this.user = this.auth.getUserAuthentification();
   // throw new Error('Method not implemented.');
   
  
  }
ngAfterViewInit() {
    console.log(this.headerApp)
    }

  logout():void{

    this.auth.logout(true);     
  }

}
