import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingupRoutingModule } from './singup.routing.module';
import { SingupComponent } from './singup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    SingupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SingupRoutingModule,
    SharedModule
  ]
})
export class SingupModule {}
