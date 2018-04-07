import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Notifycation } from './notify';
import { NotifycationService } from './notify.service';
import { NotifycationConfig } from './notify.config';
export declare class NotifycationComponent implements OnInit {
    private notifyService;
    private cd;
    config: NotifycationConfig;
    private class;
    private animation;
    private message;
    private timeout;
    private timer;
    private notification;
    private severityClass;
    constructor(notifyService: NotifycationService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    subscribeToNotifyService(): void;
    show(notification: Notifycation): void;
    clearNotification(animateTransition: boolean): void;
    buildNotification(notification: Notifycation): void;
    setNotificationAnimation(): void;
    setNotificationClasses(notification: Notifycation): void;
    setNotificationTimer(notification: Notifycation): void;
    handleClick(): void;
}
