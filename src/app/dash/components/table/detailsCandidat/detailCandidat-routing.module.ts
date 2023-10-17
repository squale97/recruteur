import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailCandidatComponent } from './detailCandidat.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DetailCandidatComponent }
    ])],
    exports: [RouterModule]
})
export class DetailCandidatRoutingModule { }
