import {inject, Injectable, signal} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserInfo} from '../../entity/UserInfo';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService {

  public readonly keycloak = inject(Keycloak);

  userInfo = signal<UserInfo>(new UserInfo());

  constructor(private readonly http: HttpClient) {
    this.getUserInfo()
  }

  hasRole(roleName: string): boolean {
    return this.keycloak.hasResourceRole(roleName)
  }

  hasRoles(roles: string[]): boolean {
    return roles.some(role => this.keycloak.hasResourceRole(role))
  }


  private getUserInfo() {
    if (this.keycloak.authenticated) {
      this.keycloak.loadUserInfo().then(value => {
        this.userInfo.set(value);
      })
    }
  }

  login() {
    this.keycloak.login();
    this.getUserInfo();

  }

  logout() {
    this.keycloak.logout();
  }

  isAuthenticated(): boolean {
    return (this.keycloak.authenticated) ?? false;
  }

}
