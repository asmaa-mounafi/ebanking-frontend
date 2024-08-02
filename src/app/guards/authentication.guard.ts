import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{
  isLoggedIn = false;
  constructor(private authService: AuthService,private router:Router) { }
  isAuthenticated(){
    return this.isLoggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated==true){
      return true
    }else {
      this.router.navigateByUrl("/login");
      return false;
    }

  }
}
