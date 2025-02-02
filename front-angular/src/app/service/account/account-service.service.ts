import {inject, Injectable, signal} from '@angular/core';
import {ShortAccount} from '../../entity/account/ShortAccount';
import {HttpClient} from '@angular/common/http';
import {Currency} from '../../entity/account/Currency';
import {environment} from '../../../../environments/environment';
import {AuthKeycloakService} from '../auth/authkeycloak.service';
import {Observable} from 'rxjs';
import {AccountNew} from '../../entity/account/AccountNew';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  shortAccountsList = signal<ShortAccount[]>([])
  currenciesLst = signal<Currency[]>([])
  keycloakService = inject(AuthKeycloakService)

  private full_back_http = environment.back_http + environment.api_version

  constructor(private readonly http: HttpClient) {
    if (this.keycloakService.isAuthenticated()) {
      this.http.get(this.full_back_http + "account")
        .subscribe(
          res => {
            this.shortAccountsList.set(res as ShortAccount[])
          }
        )

      this.http.get(this.full_back_http + "currency")
        .subscribe(
          res => {
            this.currenciesLst.set(res as Currency[])
          }
        )
    }

  }

  saveNewAccount(body: AccountNew) {
    this.http.post<ShortAccount>(this.full_back_http + "account", body)
      .subscribe(
        res => {
          this.shortAccountsList.set(this.shortAccountsList().concat(res as ShortAccount))
        }
      );
  }

  getAccount(id: string): Observable<any> {
    return this.http.get<ShortAccount>(this.full_back_http + "account/" + id);
  }
}
