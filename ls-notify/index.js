import { ChangeDetectorRef, Component, Injectable, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotificationSeverity = {
    /**
     * @return {?}
     */
    get Success() {
        return 'success';
    },
    /**
     * @return {?}
     */
    get Info() {
        return 'info';
    },
    /**
     * @return {?}
     */
    get Warning() {
        return 'warning';
    },
    /**
     * @return {?}
     */
    get Error() {
        return 'error';
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotifycationService = (function () {
    function NotifycationService() {
        var _this = this;
        this.pushNotification = new Observable$1(function (observer) { return _this._pushNotification = observer; }).share();
        this.clearNotification = new Observable$1(function (observer) { return _this._clearNotification = observer; }).share();
    }
    /**
     * @param {?} notification
     * @return {?}
     */
    NotifycationService.prototype.push = /**
     * @param {?} notification
     * @return {?}
     */
    function (notification) {
        if (!this._pushNotification) {
            throw new Error('No containers have been initialized to receive notifycations.');
        }
        this._pushNotification.next(notification);
    };
    /**
     * @return {?}
     */
    NotifycationService.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._clearNotification.next(true);
    };
    NotifycationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotifycationService.ctorParameters = function () { return []; };
    return NotifycationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var NotifycationConfig = (function () {
    function NotifycationConfig(config) {
        config = config || {};
        this.clickToDismiss = config.clickToDismiss || true;
        this.showCloseIcon = config.showCloseIcon || false;
        this.timeout = config.timeout || 5000;
        this.position = config.position || 'top';
        this.class = config.class || null;
        this.pauseOnHover = config.pauseOnHover || true;
        this.showTimer = config.showTimer || true;
        this.animation = config.animation || 'fade';
    }
    return NotifycationConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotifycationComponent = (function () {
    function NotifycationComponent(notifyService, cd) {
        this.notifyService = notifyService;
        this.cd = cd;
        this.config = new NotifycationConfig();
        this.notification = false;
        this.severityClass = new Map([
            [NotificationSeverity.Success, 'ls-success'],
            [NotificationSeverity.Warning, 'ls-warn'],
            [NotificationSeverity.Info, 'ls-info'],
            [NotificationSeverity.Error, 'ls-error']
        ]);
    }
    /**
     * @return {?}
     */
    NotifycationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.subscribeToNotifyService();
    };
    /**
     * @return {?}
     */
    NotifycationComponent.prototype.subscribeToNotifyService = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.notifyService.pushNotification.subscribe(function (message) {
            _this.show(message);
        });
        this.notifyService.clearNotification.subscribe(function () {
            _this.clearNotification(true);
        });
    };
    /**
     * @param {?} notification
     * @return {?}
     */
    NotifycationComponent.prototype.show = /**
     * @param {?} notification
     * @return {?}
     */
    function (notification) {
        if (this.notification) {
            this.clearNotification(false);
        }
        this.buildNotification(notification);
    };
    /**
     * @param {?} animateTransition
     * @return {?}
     */
    NotifycationComponent.prototype.clearNotification = /**
     * @param {?} animateTransition
     * @return {?}
     */
    function (animateTransition) {
        if (!animateTransition) {
            this.animation = 'transitioning';
            this.cd.detectChanges();
        }
        this.notification = false;
        this.cd.detectChanges();
        clearTimeout(this.timeout);
    };
    /**
     * @param {?} notification
     * @return {?}
     */
    NotifycationComponent.prototype.buildNotification = /**
     * @param {?} notification
     * @return {?}
     */
    function (notification) {
        this.setNotificationAnimation();
        this.setNotificationClasses(notification);
        this.setNotificationTimer(notification);
        this.message = notification.message;
        this.notification = true;
    };
    /**
     * @return {?}
     */
    NotifycationComponent.prototype.setNotificationAnimation = /**
     * @return {?}
     */
    function () {
        this.animation = this.config.animation;
    };
    /**
     * @param {?} notification
     * @return {?}
     */
    NotifycationComponent.prototype.setNotificationClasses = /**
     * @param {?} notification
     * @return {?}
     */
    function (notification) {
        this.class = "ls-notification " + this.severityClass.get(notification.severity) + " ls-" + this.config.position;
        this.class = this.config.clickToDismiss ? this.class + " ls-clickable" : this.class;
        this.class = this.config.class ? this.class + " " + this.config.class : this.class;
    };
    /**
     * @param {?} notification
     * @return {?}
     */
    NotifycationComponent.prototype.setNotificationTimer = /**
     * @param {?} notification
     * @return {?}
     */
    function (notification) {
        var _this = this;
        this.timer = notification.lifetime ? notification.lifetime : this.config.timeout;
        this.timeout = setTimeout(function () {
            _this.clearNotification(true);
        }, this.timer);
    };
    /**
     * @return {?}
     */
    NotifycationComponent.prototype.handleClick = /**
     * @return {?}
     */
    function () {
        if (this.config.clickToDismiss) {
            this.clearNotification(true);
        }
    };
    NotifycationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ls-notify',
                    template: "\n    <div [@animate]=\"animation\" [ngClass]=\"class\" *ngIf=\"notification\" (click)=\"handleClick()\" #notification>\n      <span class=\"ls-message\" [innerHTML]=\"message\"></span>\n      <div class=\"ls-dismiss\" *ngIf=\"config.showCloseIcon\" (click)=\"clearNotification(true)\">\n        <span class=\"ls-dismiss-icon\">&times;</span>\n      </div>\n    </div>\n  ",
                    styles: [".ls-notification { color: #FFF; cursor: default; font-size: 1.3em; opacity: 1; padding: 25px 80px; position: fixed; left: 0; right: 0; text-align: center; z-index: 9999; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .ls-dismiss-icon { position: absolute; top: -1px; left: 6px; } .ls-dismiss { background-color: #333; border-radius: 15px; box-shadow: inset 2px 2px 7px 2px #000; color: #DDD; cursor: pointer; display: none; font-size: 1.25em; font-weight: bold; height: 30px; line-height: 30px; opacity: 0.2; position: absolute; right: 40px; text-shadow: 1px 1px 5px #000; top: 25px; width: 30px; } .ls-dismiss:hover { background-color: #000; } .ls-dismiss:active { background-color: #666; } .ls-top { top: 0; } .ls-bottom { bottom: 0; } .ls-clickable { cursor: pointer; } @media only screen and (max-width: 480px) { .ls { font-size: 1em; padding: 12px 25px; } .ls-dismiss { font-size: 1em; height: 20px; line-height: 20px; right: 5px; top: 5px; width: 20px; } } .theme-default .ls-info { background-color: #0e90d2; } .theme-prime .ls-info { background-color: #0033cc; } .theme-pastel .ls-info { background-color: #7EA7D8; } .theme-dark .ls-info { background-color: #003471; } .theme-default .ls-error { background-color: #dd514c; } .theme-prime .ls-error { background-color: #ff0000; } .theme-pastel .ls-error { background-color: #F6989D; } .theme-dark .ls-error { background-color: #9E0B0F; } .theme-default .ls-success { background-color: #5eb95e; } .theme-prime .ls-success { background-color: #00cc00; } .theme-pastel .ls-success { background-color: #82CA9D; } .theme-dark .ls-success { background-color: #007236; } .theme-default .ls-grimace { background-color: #8058a5; } .theme-prime .ls-grimace { background-color: #660099; } .theme-pastel .ls-grimace { background-color: #A187BE; } .theme-dark .ls-grimace { background-color: #440E62; } "],
                    animations: [
                        trigger('animate', [
                            transition('void -> fade', [
                                style({ opacity: 0 }),
                                animate(500, style({ opacity: 1 }))
                            ]),
                            transition('fade -> void', [
                                style({ opacity: 1 }),
                                animate(500, style({ opacity: 0 }))
                            ]),
                            transition('void -> slide', [
                                style({ opacity: 1, transform: 'translateY(100%)' }),
                                animate('500ms ease-in', style({ transform: 'translateY(0)' }))
                            ]),
                            transition('slide -> void', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('500ms ease-out', style({ transform: 'translateY(100%)' }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NotifycationComponent.ctorParameters = function () { return [
        { type: NotifycationService, },
        { type: ChangeDetectorRef, },
    ]; };
    NotifycationComponent.propDecorators = {
        "config": [{ type: Input },],
    };
    return NotifycationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotifyModule = (function () {
    function NotifyModule() {
    }
    /**
     * @return {?}
     */
    NotifyModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NotifyModule,
            providers: [NotifycationService]
        };
    };
    /**
     * @return {?}
     */
    NotifyModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NotifyModule,
            providers: []
        };
    };
    NotifyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NotifycationComponent
                    ],
                    exports: [
                        NotifycationComponent
                    ]
                },] },
    ];
    return NotifyModule;
}());

export { NotifyModule, NotifycationComponent, NotifycationService };
