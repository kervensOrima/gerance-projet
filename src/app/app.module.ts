import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.module.routing';
import { HeaderComponent } from './component/header/header.component';
import { LeftMenuComponent } from './component/left-menu/left-menu.component';
import { HomeComponent } from './home/home.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AboutComponent } from './public/about/about.component';
import { HomeServiceComponent } from './public/home-service/home-service.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceListComponent } from './service-list/service-list.component';
import { EquipeComponent } from "./equipe/equipe.component";
import { ServiceInfoComponent } from './service-info/service-info.component';
import { MenuComponent } from './public/component/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table' ;
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from "@angular/material/input";
import { MyFooterComponent } from './public/component/my-footer/my-footer.component';
import { PersonnelFormComponent } from './personnel-form/personnel-form.component';
import { PersonnelTableComponent } from './personnel-table/personnel-table.component';
import { PersonneInfoComponent } from './personne-info/personne-info.component';
import { DemandeComponent } from './public/demande/demande.component';
import { LoginComponent } from './login/login.component';
import { GuardGuard } from './guard.guard';
import { AuthService } from './services/auth.service';
import { EquipesService } from './services/equipes.service';
import { MesServiceService } from './services/mes-service.service';
import { ClientService } from './services/client.service';
import { UtilitiesService } from './services/utilities.service';
import { ClientInfoComponent } from './client-info/client-info.component';

@NgModule({
  declarations: [
    AppComponent ,
    HeaderComponent ,
    LeftMenuComponent ,
    HomeComponent ,
    PageNotfoundComponent,
    DashboardComponent,
    DashboardAdminComponent,
    AboutComponent,
    HomeServiceComponent,
    FooterComponent,
    ServiceListComponent,
    ServiceInfoComponent,
    MenuComponent ,
    EquipeComponent,
    MyFooterComponent,
    PersonnelFormComponent,
    PersonnelTableComponent,
    PersonneInfoComponent,
    DemandeComponent,
    LoginComponent,
    ClientInfoComponent

  ],
  imports: [
    BrowserModule ,
    AppRoutingModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpClientModule ,
    BrowserAnimationsModule  ,
    MatTableModule  ,
    MatPaginatorModule ,
    MatSortModule ,
    MatInputModule

  ],
  providers: [
    AuthService,
    ClientService ,
    UtilitiesService ,
    EquipesService ,
    MesServiceService ,
    GuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
