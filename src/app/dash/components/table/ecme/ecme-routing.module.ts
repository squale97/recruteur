import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EcmeComponent } from './ecme.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EcmeComponent }
    ])],
    exports: [RouterModule]
})
export class EcmeRoutingModule { }
