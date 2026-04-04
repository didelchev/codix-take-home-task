import { Routes } from '@angular/router';
import { ClientProfile } from './components/client-profile/client-profile';
import { Transactions } from './components/transactions/transactions';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'client',
        pathMatch: 'full'

    },

    {
        path: 'client',
        component: ClientProfile
    },
    {
        path: 'transactions',
        component: Transactions
    },
    {
        path: "**",
        component: NotFound
    }
];
