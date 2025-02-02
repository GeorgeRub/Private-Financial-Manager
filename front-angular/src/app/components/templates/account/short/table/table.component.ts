import {Component, inject} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {AccountService} from '../../../../../service/account/account-service.service';

@Component({
  selector: 'account-short-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    RouterLink,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class AccountShortTableComponent {

  protected accountService: AccountService = inject(AccountService)

  displayedColumns: string[] = ['accountName', 'currency', 'amount'];

}
