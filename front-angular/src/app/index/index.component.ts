import {Component, inject, OnInit} from '@angular/core';
import {AuthKeycloakService} from '../service/auth/authkeycloak.service';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  protected keycloakService: AuthKeycloakService = inject(AuthKeycloakService)



  ngOnInit(): void {
    console.log('IndexComponent ngOnInit');
    console.log(this.keycloakService.hasRole('pfm-admin-role'))
    console.log('has pfm-admin-role role => ',this.keycloakService.hasRole('pfm-admin-role'))
  }





}
