import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GeneratorComponent } from './generator/generator.component';
import { AdminComponent } from './admin/admin.component';
import { PortaComponent } from './porta/porta.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneratorComponent,
    AdminComponent,
    PortaComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
