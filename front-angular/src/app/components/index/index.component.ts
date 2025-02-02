import {Component, inject} from '@angular/core';
import {AuthKeycloakService} from '../../service/auth/authkeycloak.service';
import {AccountService} from '../../service/account/account-service.service';
import {MatDialog} from '@angular/material/dialog';
import {AddNewAccountComponent} from '../templates/account/dialog/add-new-account/add-new-account.component';
import {NgIf} from '@angular/common';
import {AccountShortTableComponent} from '../templates/account/short/table/table.component';

@Component({
  selector: 'app-index',
  imports: [
    NgIf,
    AccountShortTableComponent,
  ],
  templateUrl: './index.component.html',
  standalone: true,
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  protected keycloakService: AuthKeycloakService = inject(AuthKeycloakService)
  protected accountService: AccountService = inject(AccountService)

  readonly dialog = inject(MatDialog)

  addNewAccount() {
    this.dialog.open(AddNewAccountComponent,{
      width:'30rem',
      height:'auto',
      disableClose: true
    })
  }

}
