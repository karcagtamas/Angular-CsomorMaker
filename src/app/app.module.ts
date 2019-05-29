import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
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
  MatSelectModule,
  MatExpansionModule
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
import { ConvertToHourPipe } from './pipes/convert-to-hour.pipe';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { WorkExportComponent } from './components/work-export/work-export.component';
import { WorkerExportComponent } from './components/worker-export/worker-export.component';
import { SimpleWorkExportComponent } from './components/simple-work-export/simple-work-export.component';
import { SimpleWorkerExportComponent } from './components/simple-worker-export/simple-worker-export.component';
import { ExistsPipe } from './pipes/exists.pipe';
import { ExportCsomorComponent } from './components/export-csomor/export-csomor.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';
import { IsAdminPipe } from './pipes/is-admin.pipe';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreateLetterPipe } from './pipes/create-letter.pipe';
import { GtComponent } from './gt/gt.component';
import { GtWorkComponent } from './components/gt-work/gt-work.component';
import { GtWorkerComponent } from './components/gt-worker/gt-worker.component';
import { GtWorkerExportComponent } from './components/gt-worker-export/gt-worker-export.component';
import { GtWorkExportComponent } from './components/gt-work-export/gt-work-export.component';
import { GeneratorResultsComponent } from './components/generator-results/generator-results.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ForintPipe } from './pipes/forint.pipe';
import { PersonCountPipe } from './pipes/person-count.pipe';
import { PayOutsComponent } from './components/pay-outs/pay-outs.component';
import { AddNewPaysComponent } from './components/add-new-pays/add-new-pays.component';

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
    HoursPipe,
    ConvertToHourPipe,
    WorkExportComponent,
    WorkerExportComponent,
    SimpleWorkExportComponent,
    SimpleWorkerExportComponent,
    ExistsPipe,
    ExportCsomorComponent,
    NewUserComponent,
    UsersComponent,
    IsAdminPipe,
    MyProfileComponent,
    CreateLetterPipe,
    GtComponent,
    GtWorkComponent,
    GtWorkerComponent,
    GtWorkerExportComponent,
    GtWorkExportComponent,
    GeneratorResultsComponent,
    SummaryComponent,
    ForintPipe,
    PersonCountPipe,
    PayOutsComponent,
    AddNewPaysComponent
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
    MatSelectModule,
    MatExpansionModule,
    PDFExportModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
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
