import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddOffreComponent } from './addOffre.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AddOffreComponent }
    ])],
    exports: [RouterModule]
})
export class AddOffreRoutingModule { }
