import {Component, inject, input, OnInit} from '@angular/core';
import {AccountRecordsService} from '../../../../service/account/account-records-service';

@Component({
  selector: 'app-account-records',
  imports: [],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements  OnInit {

  recordService = inject(AccountRecordsService)
  accountId = input.required<string>()

  ngOnInit(): void {

    console.log('account id from local storage: ' + this.accountId())

    this.recordService.getRecords(this.accountId())
      .subscribe(
        res => {
          console.log(res)
        }
      )

  }



}
