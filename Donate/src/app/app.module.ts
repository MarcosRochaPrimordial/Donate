import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredenciaisComponent } from './credenciais/credenciais.component';
import { CredentiasComponent } from './credentias/credentias.component';

@NgModule({
  declarations: [
    AppComponent,
    CredenciaisComponent,
    CredentiasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
