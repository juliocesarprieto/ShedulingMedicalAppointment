import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharedService {
  public isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
