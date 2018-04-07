import {NotificationSeverity} from './notify.severity';

interface Notifycation {
    title?: string;
    message?: any;
    severity?: NotificationSeverity;
    isPermanent?: boolean;
    lifetime?: number;
}

export { Notifycation };
