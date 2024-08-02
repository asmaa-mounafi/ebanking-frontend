import { Injectable } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate{
  isLoggedIn = false;
  constructor(private authService : AuthService,private router : Router) { }
  isAuthenticated(){
    return this.isLoggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.roles.includes('ADMIN')){
      return true
    }else
this.router.navigateByUrl("/admin/notAuthorized")
    return false;
  }
}
