import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
   declarations: [
      AppComponent,
      NotFoundComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot() // ToastrModule added
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
