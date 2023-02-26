import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient) { }

  getProfile(firstname: string): Observable<any> {

    /*return this.http.get('http://localhost:3000/users/'+firstname).subscribe({

    error: (error) => { 
      console.log(error)
       }

    })*/
    return this.http.get('http://localhost:3000/users/' + firstname, { withCredentials: true })

  }
  editUser(originalFirstname: string, user: {}): Observable<any/*RegisterService.UserCredential*/> {

    const url = 'http://localhost:3000/users/' + originalFirstname;
    return this.http.patch(url, user, { withCredentials: true })
    //return of({credential:true,user:user}); 

  }

  deleteUser(firstname: string): Observable<any> {
    return this.http.delete('http://localhost:3000/users/' + firstname, { withCredentials: true })
  }

}
