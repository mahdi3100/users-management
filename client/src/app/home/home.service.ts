import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get("http://localhost:3000/users",{ withCredentials: true});
    
    /*  let users =  [{
              pseudo:"pseudo1",
              role:"role"
      },{
        pseudo:"pseudo1",
        role:"role"
      }];
  return users*/

  }
  uploadCSV(formData:any):Observable<any>{
    return this.http.post('http://localhost:3000/upload', formData, { withCredentials: true})
  }
  addUser(user:User):Observable<any/*RegisterService.UserCredential*/>{
    console.log(user)
    const url = 'http://localhost:3000/users';
    return this.http.post(url,user,{ withCredentials: true})
 //return of({credential:true,user:user}); 
     
  }
}
