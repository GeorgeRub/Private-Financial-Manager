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
    console.log('AuthKeycloakService constructor');
    this.getUserInfo()
  }

  hasRole(roleName: string): boolean {
    return this.keycloak.hasResourceRole(roleName)
  }

  private getUserInfo() {
    if (this.keycloak.authenticated) {
      this.keycloak.loadUserInfo().then(value => {
        console.log(value);
        this.userInfo.set(value);
      })
      console.log('before google request')
      this.http.get('www.google.com/').subscribe(config => {
        console.log('on subscribe')
        console.log(config);
      });
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
