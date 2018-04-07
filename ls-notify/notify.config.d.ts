export interface INotifycationConfig {
    clickToDismiss?: boolean;
    showCloseIcon?: boolean;
    timeout?: number;
    position?: string;
    class?: string;
    pauseOnHover?: boolean;
    showTimer?: boolean;
    animation?: string;
}
export declare class NotifycationConfig implements INotifycationConfig {
    clickToDismiss?: boolean;
    showCloseIcon?: boolean;
    timeout: number;
    position: string;
    class: string;
    pauseOnHover: boolean;
    showTimer: boolean;
    animation: string;
    constructor(config?: INotifycationConfig);
}
