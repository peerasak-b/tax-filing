import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxFillingComponent } from './module/tax-filling/components/tax-filling.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tax-filling'
},
{
  path: 'tax-filling',
  component: TaxFillingComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
