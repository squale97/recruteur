import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './dash/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./dash/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'table', loadChildren: () => import('./dash/components/table/table.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./dash/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                   
                    { path: 'pages', loadChildren: () => import('./dash/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./dash/components/auth/auth.module').then(m => m.AuthModule) },
           // { path: 'resetPass', loadChildren: () => import('./dash/components/auth/resetPass/reset.module').then(m => m.ResetModule) },
           
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
