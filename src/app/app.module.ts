import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SignInComponent } from './sign-in/sign-in.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './panel/admin-panel/admin/admin.component';
import { ClientComponent } from './panel/client-panel/client/client.component';
import { PanelHeaderComponent } from './panel/panel-header/panel-header.component';
import { EditPersonalInformationComponent } from './panel/edit-personal-information/edit-personal-information.component';
import { ContactUsManagementComponent } from './panel/admin-panel/contact-us-management/contact-us-management.component';
import { SymbolsComponent } from './panel/client-panel/symbols/symbols.component';

const routes: Routes = [
  { path: 'website', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  {
    path: 'client', component: ClientComponent, children: [
      { path: 'edit-information', component: EditPersonalInformationComponent },
      { path: 'symbols', component: SymbolsComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'edit-information', component: EditPersonalInformationComponent },
      { path: 'contactUs', component: ContactUsManagementComponent },
    ]
  },
  { path: '', redirectTo: 'website', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    ContactUsComponent,
    AboutUsComponent,
    AdminComponent,
    ClientComponent,
    PanelHeaderComponent,
    EditPersonalInformationComponent,
    ContactUsManagementComponent,
    SymbolsComponent,
  ],
  imports: [
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
