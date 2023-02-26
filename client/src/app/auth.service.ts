import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListenerService } from './listener.service';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
  private isLogged : Boolean = false;
  constructor(    private route: ActivatedRoute,
    private router: Router,
    private listener:ListenerService,
    private http:HttpClient) { }

    public get auth(){
      return this.isLogged;
    }
    private set auth(logged:Boolean){
      this.isLogged=logged;
    }
    
    logging(credential :Boolean , user:User|null):void{
    /**have to decare in construct https://angular.io/guide/router#accessing-query-parameters-and-fragments */
    this.auth=credential;
    if(credential && user){
    this.auth=credential;
     this.router.navigate(['/home'/*, { id: "idItem",user:user}*/], { relativeTo: this.route });
     localStorage.setItem('user', JSON.stringify({firstname:user.firstname,lastname:user.lastname , email:user.email}));
     //event Emmiter to Header
    
     this.listener.sendEvent({ user: {firstname:user.firstname,lastname:user.lastname , email:user.email} });
     }else{
      alert("Credential FALSE")
    }
  }

  //use it in app compoennt for header
  public getUserAuthentification():User|null{
    if(localStorage.getItem("user")){
      return JSON.parse(localStorage.getItem("user")!)
    }else{
      return null
    }
  }

  /**
   * 
   * @param clickedLogout called also when server return unauthorized - session expired OR button logout
   */
  logout(clickedLogout=false):void{

    this.auth = false;
    clickedLogout && this.http.get("http://localhost:3000/logout",{withCredentials:true}).subscribe()
    if(localStorage.getItem("user"))
      localStorage.removeItem("user")
      this.router.navigate(['/register'], { relativeTo: this.route });
     this.listener.sendEvent({ user: null });

  }
}
