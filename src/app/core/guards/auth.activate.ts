import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthActivate implements CanActivate {
  isAuth!: boolean;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ){
    this._authService.user.subscribe((user) => {
      this.isAuth = user ? true : false
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const { autenticationRequired, autenticationFailureRedirectUrl } = route.data;
    if (autenticationRequired === this.isAuth) {      
      return true;
    }
    return this._router.parseUrl(autenticationFailureRedirectUrl || '/');
  }
}