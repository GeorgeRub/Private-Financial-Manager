import {inject, Injectable, signal} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserInfo} from '../../entity/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService {

  protected readonly keycloak = inject(Keycloak);

  userInfo = signal<UserInfo>(new UserInfo());

  constructor() {
    console.log('AuthKeycloakService constructor');
    this.getUserInfo()
  }


  private getUserInfo() {
    this.keycloak.loadUserInfo().then(value => {
      console.log(value);
      this.userInfo.set(value);
    })
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  isAuthenticated(): boolean {
    return (this.keycloak.authenticated) ?? false;
  }

}
