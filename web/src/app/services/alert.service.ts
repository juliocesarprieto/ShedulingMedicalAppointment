import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class AlertService {

     private subject = new Subject<any>();

     constructor() {}

     success(message: string) {
          this.subject.next({ type: 'success', text: message });
     }

     error(message: string, keepAfterNavigationChange = false) {
          this.subject.next({ type: 'danger', text: message });
     }

     getMessage(): Observable<any> {
          return this.subject.asObservable();
      }
}
