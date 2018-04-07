export interface INotifycationConfig {
  clickToDismiss?: boolean;
  showCloseIcon?: boolean;
  timeout?: number;
  position?: string; // TODO: enum
  class?: string;
  pauseOnHover?: boolean;
  showTimer?: boolean;
  animation?: string; // TODO: enum
}

export class NotifycationConfig implements INotifycationConfig {
  clickToDismiss?: boolean;
  showCloseIcon?: boolean;
  timeout: number;
  position: string; // TODO: enum
  class: string;
  pauseOnHover: boolean;
  showTimer: boolean;
  animation: string; // TODO: enum

  constructor(config?: INotifycationConfig) {
    config = config || {};
    this.clickToDismiss = config.clickToDismiss || true;
    this.showCloseIcon = config.showCloseIcon || false;
    this.timeout = config.timeout || 5000;
    this.position = config.position || 'bottom';
    this.class = config.class || null;
    this.pauseOnHover = config.pauseOnHover || true;
    this.showTimer = config.showTimer || true;
    this.animation = config.animation || 'fade';
  }
}
