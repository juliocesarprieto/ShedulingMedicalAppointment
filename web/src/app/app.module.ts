import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider, JwtInterceptorProvider, AuthGuardService } from './interceptors';
import { UserService } from './services';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    SharedModule,
  ],
  providers: [
    UserService,
    StorageService,
    AuthGuardService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
