import {Component, inject, OnInit} from '@angular/core';
import {AuthKeycloakService} from '../service/auth/authkeycloak.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  standalone: true,
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  protected keycloakService: AuthKeycloakService = inject(AuthKeycloakService)

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log('IndexComponent ngOnInit');
    console.log(this.keycloakService.hasRole('pfm-admin-role'))
    console.log('has pfm-admin-role role => ', this.keycloakService.hasRole('pfm-admin-role'))

    this.http.get('http://localhost:8082/api/v1/index').subscribe(res => console.log(res));

  }


}
