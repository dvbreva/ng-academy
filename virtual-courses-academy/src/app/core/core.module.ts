import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule,
        ReactiveFormsModule],
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent]
})
export class CoreModule {
}
