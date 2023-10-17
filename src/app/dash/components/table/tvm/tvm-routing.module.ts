import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TvmComponent } from './tvm.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TvmComponent }
    ])],
    exports: [RouterModule]
})
export class TvmRoutingModule { }
