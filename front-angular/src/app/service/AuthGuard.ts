import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthKeycloakService} from './auth/authkeycloak.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private keycloak: AuthKeycloakService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    MaybeAsync<GuardResult> | Observable<boolean> | Promise<boolean> | boolean {
    if (!this.keycloak.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    if (route.data['roles'] !== undefined
      && route.data['roles'].length > 0
      && !this.keycloak.hasRoles(route.data['roles'])) {
      this.router.navigate(['/']);
    }

    return true;
  }


}
