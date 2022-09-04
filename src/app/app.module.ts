import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/panel/admin-panel/admin/admin.component';
import { ClientComponent } from './pages/panel/client-panel/client/client.component';
import { PanelHeaderComponent } from './pages/panel/panel-header/panel-header.component';
import { EditPersonalInformationComponent } from './pages/panel/edit-personal-information/edit-personal-information.component';
import { ContactUsManagementComponent } from './pages/panel/admin-panel/contact-us-management/contact-us-management.component';
import { SymbolsComponent } from './pages/panel/client-panel/symbols/symbols.component';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { VWAPComponent } from './pages/panel/client-panel/algorithms/vwap/vwap.component';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { UserService } from './services/userService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from './services/cookieService';
import { HttpErrorInterceptor } from './shared/AppHttpInterceptor';
import { ContactUsService } from './services/contactUsService';
import { ContactUsersComponent } from './pages/panel/admin-panel/contact-users/contact-users.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './shared/CustomMatPaginatorIntl';
import { UsersInfoComponent } from './pages/panel/admin-panel/users-info/users-info.component';
import { TransactionService } from './services/transactionService';
import { MatSelectModule } from '@angular/material/select';
import { AlgorithmService } from './services/algorithmService';
import { MatTabsModule } from '@angular/material/tabs';
import { TwapComponent } from './pages/panel/client-panel/algorithms/twap/twap.component';
import { PovComponent } from './pages/panel/client-panel/algorithms/pov/pov.component';
import { ItaComponent } from './pages/panel/client-panel/algorithms/ita/ita.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderService } from './services/orderService';
import { OrdersHistoryComponent } from './pages/panel/client-panel/orders-history/orders-history.component';
import { TradesComponent } from './pages/panel/client-panel/trades/trades.component';
import { TradeService } from './services/tradeService';
import { ServicesComponent } from './pages/services/services.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SymbolDialogComponent } from './pages/panel/client-panel/symbols/symbol-dialog/symbol-dialog.component';

const routes: Routes = [
  { path: 'website', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  {
    path: 'client', component: ClientComponent, children: [
      { path: 'edit-information', component: EditPersonalInformationComponent },
      { path: 'symbols', component: SymbolsComponent },
      { path: 'vwap', component: VWAPComponent },
      { path: 'twap', component: TwapComponent },
      { path: 'ita', component: ItaComponent },
      { path: 'pov', component: PovComponent },
      { path: 'orders-history', component: OrdersHistoryComponent },
      { path: 'trades', component: TradesComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'edit-information', component: EditPersonalInformationComponent },
      { path: 'contactUs', component: ContactUsManagementComponent },
      { path: 'users-info', component: UsersInfoComponent },
      { path: 'contactWithUsers', component: ContactUsersComponent }
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
    VWAPComponent,
    ContactUsersComponent,
    UsersInfoComponent,
    TwapComponent,
    PovComponent,
    ItaComponent,
    OrdersHistoryComponent,
    TradesComponent,
    ServicesComponent,
    SymbolDialogComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    },
    TradeService,
    OrderService,
    AlgorithmService,
    UserService,
    MatSnackBar,
    ContactUsService,
    CookieService,
    TransactionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
