import { Observable } from 'rxjs/Observable';
import { Notifycation } from './notify';
import 'rxjs/add/operator/share';
export declare class NotifycationService {
    pushNotification: Observable<Notifycation>;
    private _pushNotification;
    clearNotification: Observable<any>;
    private _clearNotification;
    constructor();
    push(notification: Notifycation): void;
    clear(): void;
}
