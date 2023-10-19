import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffreComponent } from './offre.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OffreComponent }
    ])],
    exports: [RouterModule]
})
export class OffreRoutingModule { }
