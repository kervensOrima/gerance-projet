import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private authService:AuthService , private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.log( 'Value of boolean' , this.authService.connected )

      // if( this.authService.connected ){
      //   return true ;
      // }else {
      //   this.router.navigate( ['/login'])
      //   return false
      // }
       return true ;
  }
  
}
