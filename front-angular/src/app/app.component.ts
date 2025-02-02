import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {NgIf} from '@angular/common';
import {AuthKeycloakService} from './service/auth/authkeycloak.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDrawerContainer, MatDrawer, NgIf, MatIcon, RouterLink],
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


