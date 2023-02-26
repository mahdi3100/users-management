import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListenerService {


  private subject = new Subject<any>();
  constructor() { }
  
  sendEvent(event: any) {
    this.subject.next(event);
  }

  getEvent() {
    return this.subject.asObservable();
  }
}
