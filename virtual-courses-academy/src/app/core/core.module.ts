import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
    imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule],
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent]
})
export class CoreModule {
}
