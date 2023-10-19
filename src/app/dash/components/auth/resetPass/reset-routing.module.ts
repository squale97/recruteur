import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetComponent } from './reset.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ResetComponent },
        { path: 'codeVerification', loadChildren: () => import('./code/code.module').then(m => m.CodeModule) },
        { path: 'updatePass', loadChildren: () => import('./updatePass/update.module').then(m => m.UpdateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ResetRoutingModule { }



