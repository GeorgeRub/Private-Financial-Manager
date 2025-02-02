import {Routes} from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {AccountComponent} from './components/account/account.component';
import {AuthGuard} from './service/AuthGuard';

export const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['pfm-user']
    }
  }
];
