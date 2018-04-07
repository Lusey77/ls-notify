import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Notifycation } from './notify';
import 'rxjs/add/operator/share';

@Injectable()
export class NotifycationService {
  pushNotification: Observable<Notifycation>;
  private _pushNotification: Observer<Notifycation>;

  clearNotification: Observable<any>;
  private _clearNotification: Observer<any>;

  constructor() {
    this.pushNotification = new Observable<Notifycation>((observer: any) => this._pushNotification = observer).share();
    this.clearNotification = new Observable<any>((observer: any) => this._clearNotification = observer).share();
  }

  push(notification: Notifycation): void {
    if (!this._pushNotification) {
      throw new Error('No containers have been initialized to receive notifycations.');
    }

    this._pushNotification.next(notification);
  }

  clear(): void {
    this._clearNotification.next(true);
  }

}
