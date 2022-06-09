import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EquipeComponent } from "./equipe/equipe.component";
import { GuardGuard } from "./guard.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PageNotfoundComponent } from "./page-notfound/page-notfound.component";
import { PersonneInfoComponent } from "./personne-info/personne-info.component";
import { PersonnelFormComponent } from "./personnel-form/personnel-form.component";
import { PersonnelTableComponent } from "./personnel-table/personnel-table.component";
import { AboutComponent } from "./public/about/about.component";
import { DemandeComponent } from "./public/demande/demande.component";
import { HomeServiceComponent } from "./public/home-service/home-service.component";
import { ServiceInfoComponent } from "./service-info/service-info.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { ClientInfoComponent } from './client-info/client-info.component' ;


const routes :Routes = [
    //private Url
    { path : '' , redirectTo:'/login' , pathMatch:'full' } ,
    { path : 'login' , component:LoginComponent } ,
    { path : 'home' ,  canActivate:[GuardGuard] , component:HomeComponent } ,
    { path : 'dashboard-v1' , canActivate:[GuardGuard]  , component:DashboardComponent } ,
    { path : 'dashboard-v2' , canActivate:[GuardGuard]  , component:DashboardAdminComponent } ,
    { path : 'equipe' , canActivate:[GuardGuard]  , component:EquipeComponent } ,
    { path : 'services-all' , canActivate:[GuardGuard]  , component:ServiceListComponent } ,
    { path : 'service-info/:id' , canActivate:[GuardGuard]  , component:ServiceInfoComponent } ,
    { path : 'personnel-form' , canActivate:[GuardGuard]  ,component:PersonnelFormComponent } ,
    { path : 'personnel-form/:id' , canActivate:[GuardGuard]  , component:PersonnelFormComponent } ,
    { path : 'personnel-table' , canActivate:[GuardGuard]  , component:PersonnelTableComponent } ,
    { path : 'personnel-info/:id' , canActivate:[GuardGuard]  , component:PersonneInfoComponent } ,
    { path : 'client-info/:id' , canActivate:[GuardGuard]  , component:ClientInfoComponent } ,

    //public Url
    { path : 'public/about' , component:AboutComponent } ,
    { path : 'public/services' , component:HomeServiceComponent } ,
    { path : 'public/demandes' , component:DemandeComponent } ,


    //Error url
    { path : '**' , component:PageNotfoundComponent } ,


]

@NgModule({
    exports : [
        RouterModule
    ] ,
    imports : [
        RouterModule.forRoot( routes )
    ]
})
export class AppRoutingModule {

}
