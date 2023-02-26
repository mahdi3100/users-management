import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  signup(user: User): Observable<any/*RegisterService.UserCredential*/> {

    /*user =  {
        firstname:"mehdi",
        lastname:"mehdi",
        role:"mehdi ",
        email:"test@test.com",
        password:"test"
      }*/
    const url = 'http://localhost:3000/users';
    return this.http.post(url, user, { withCredentials: true })
    //return of({credential:true,user:user}); 

  }
  signin(user: User): Observable<any>/*:Observable<RegisterService.UserCredential>*/ {

    /*
       if (user.email === 'test@test.com' && user.password === 'test') { 
   
         user = {firstname:"firstname",lastname:"lastname",email:user.email,role:"role"}
        
         //OF Because "Observable"
         return of({credential:true,user:{...user}}); 
       } 
       //OF Because "Observable"
       return of({credential:false, user:null});
   */
    const url = 'http://localhost:3000/auth/signin';

    return this.http.post(url, user, { withCredentials: true })
  }
  

}
/** Can not implement interface inside a class */
namespace RegisterService {
  export interface UserCredential {
    credential: Boolean,
    user: User | null,

  }
}
