import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountRecordsService {

  http = inject(HttpClient);
  private full_back_http = environment.back_http + environment.api_version

  getRecords(id: string): Observable<any> {
    return this.http.get(this.full_back_http + "records/" + id);
  }

}
