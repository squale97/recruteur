import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrComponent } from './tr.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TrComponent }
    ])],
    exports: [RouterModule]
})
export class TrRoutingModule { }
