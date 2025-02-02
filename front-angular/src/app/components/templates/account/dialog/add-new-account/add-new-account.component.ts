import {Component, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../../../../service/account/account-service.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AccountNew} from '../../../../../entity/account/AccountNew';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

class CreateNewAccountDialogData {

}

@Component({
  selector: 'app-add-new-account',
  imports: [
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput, MatLabel, MatOption, MatSelect
  ],
  templateUrl: './add-new-account.component.html',
  styleUrl: './add-new-account.component.scss'
})
export class AddNewAccountComponent {

  readonly dialogRef = inject(MatDialogRef<AddNewAccountComponent>)
  readonly data = inject<CreateNewAccountDialogData>(MAT_DIALOG_DATA)

  triedToSubmit = signal(false);

  accountService = inject(AccountService)

  newAccountForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(25)]
    }),
    shortName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(15)]
    }),
    currency: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1)]
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(120)]
    }),
    amount: new FormControl(0.00),
  })


  get currencyValid() {
    return this.newAccountForm.controls.currency.invalid
      && this.newAccountForm.controls.currency.touched
      && this.newAccountForm.controls.currency.dirty
  }

  getControllerByName(name: string) {
    return this.newAccountForm.get(name)
  }

  saveNewAccount() {

    this.triedToSubmit.set(this.newAccountForm.invalid)

    if (this.newAccountForm.valid) {
      let newAccount = {
        name: this.newAccountForm.value.name,
        currency: this.newAccountForm.value.currency,
        amount: this.newAccountForm.value.amount,
        description: this.newAccountForm.value.description,
        shortName: this.newAccountForm.value.shortName
      } as AccountNew

      this.accountService.saveNewAccount(newAccount)
      this.dialogRef.close()
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
