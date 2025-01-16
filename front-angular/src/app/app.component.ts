import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {AuthKeycloakService} from './service/auth/authkeycloak.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDrawerContainer, MatDrawer, MatButton, NgIf, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-angular';

  protected keycloakService: AuthKeycloakService = inject(AuthKeycloakService)

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }

}


