import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidatureComponent } from './candidature.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CandidatureComponent }
    ])],
    exports: [RouterModule]
})
export class CandidatureRoutingModule { }
