import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditOffreComponent } from './editOffre.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EditOffreComponent }
    ])],
    exports: [RouterModule]
})
export class EditOffreRoutingModule { }
