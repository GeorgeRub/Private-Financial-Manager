import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../service/account/account-service.service';
import {Account} from '../../entity/account/Account';
import {CurrencyPipe} from '@angular/common';
import {RecordsComponent} from '../templates/account/records/records.component';

@Component({
  selector: 'app-account',
  imports: [
    CurrencyPipe,
    RecordsComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {

  id = signal('')
  accountService = inject(AccountService)
  account = signal<Account | null>(null)

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id.set(this.route.snapshot.params['id']);
    this.accountService.getAccount(this.id())
      .subscribe(
        res => {
          this.account.set(res as Account)
        }
      )
  }

}
