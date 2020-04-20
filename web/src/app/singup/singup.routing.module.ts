import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingupComponent } from './singup.component';

const routes: Routes = [
    {
      path: '',
      component: SingupComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SingupRoutingModule {}
