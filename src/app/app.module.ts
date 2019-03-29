import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatListModule,
  MatMenuModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GeneratorComponent } from './generator/generator.component';
import { AdminComponent } from './admin/admin.component';
import { PortaComponent } from './porta/porta.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { environment } from 'src/environments/environment';
import { NewEventModalComponent } from './components/new-event-modal/new-event-modal.component';
import { ModifyEventComponent } from './components/modify-event/modify-event.component';
import { AddAdModalComponent } from './components/add-ad-modal/add-ad-modal.component';
import { TrustHTMLPipe } from './pipes/trust-html.pipe';
import { NewGeneratorModalComponent } from './components/new-generator-modal/new-generator-modal.component';
import { NewWorkerModalComponent } from './components/new-worker-modal/new-worker-modal.component';
import { NewWorkModalComponent } from './components/new-work-modal/new-work-modal.component';
import { HoursPipe } from './pipes/hours.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneratorComponent,
    AdminComponent,
    PortaComponent,
    NavigatorComponent,
    HomeComponent,
    PageNotFoundComponent,
    NewEventModalComponent,
    ModifyEventComponent,
    AddAdModalComponent,
    TrustHTMLPipe,
    NewGeneratorModalComponent,
    NewWorkerModalComponent,
    NewWorkModalComponent,
    HoursPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    RouterModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NewEventModalComponent,
    ModifyEventComponent,
    AddAdModalComponent,
    NewGeneratorModalComponent,
    NewWorkerModalComponent,
    NewWorkModalComponent
  ],
  exports: [
    NewEventModalComponent,
    ModifyEventComponent,
    AddAdModalComponent,
    NewGeneratorModalComponent,
    NewWorkerModalComponent,
    NewWorkModalComponent
  ]
})
export class AppModule {}
