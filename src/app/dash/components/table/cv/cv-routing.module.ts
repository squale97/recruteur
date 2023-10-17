import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CvComponent } from './cv.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CvComponent }
    ])],
    exports: [RouterModule]
})
export class CvRoutingModule { }
