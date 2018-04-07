import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotifycationComponent} from './notify.component';
import {NotifycationService} from './notify.service';

export * from './notify.component';
export * from './notify.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NotifycationComponent
    ],
    exports: [
        NotifycationComponent
    ]
})
export class NotifyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotifyModule,
            providers: [NotifycationService]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: NotifyModule,
            providers: []
        };
    }
}
