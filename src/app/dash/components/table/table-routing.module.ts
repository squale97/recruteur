import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
       
       
       
       
        { path: 'offre', data: { breadcrumb: 'Tvm' }, loadChildren: () => import('./offre/offre.module').then(m => m.OffreModule) }, 
        { path: 'tr', data: { breadcrumb: 'Tr' }, loadChildren: () => import('./tr/tr.module').then(m => m.TrModule) },
        { path: 'ecme', data: { breadcrumb: 'ecme' }, loadChildren: () => import('./ecme/ecme.module').then(m => m.EcmeModule) },  
        { path: 'addOffre', data: { breadcrumb: 'addOffre' }, loadChildren: () => import('./addOfrre/addOffre.module').then(m => m.AddOffreModule) },
        { path: 'editOffre', data: { breadcrumb: 'editOffre' }, loadChildren: () => import('./editOfrre/editOffre.module').then(m => m.EditOffreModule) }, 
        { path: 'candidatures', data: { breadcrumb: 'candidatures' }, loadChildren: () => import('./candidatures/candidature.module').then(m => m.CandidatureModule) },
        { path: 'candidature-details', data: { breadcrumb: 'candidatures-details' }, loadChildren: () => import('./detailsCandidat/detailCandidat.module').then(m => m.DetailCandidatModule) },   
        { path: 'cv', data: { breadcrumb: 'cv' }, loadChildren: () => import('./cv/cv.module').then(m => m.CvModule) },   
       // { path: 'resetPass', data: { breadcrumb: 'resetPass' }, loadChildren: () => import('../resetPass/reset.module').then(m => m.ResetModule) },                   
      
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class TableRoutingModule { }
