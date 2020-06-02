import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ManagementComponent } from './management/management.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersRoutingModule,
    NgbModule
  ],
  declarations: [
    UsersComponent,
    ManagementComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ]
})
export class UsersModule { }
