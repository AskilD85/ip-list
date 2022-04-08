import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpListComponent } from './ip-list/ip-list.component';

const routes: Routes = [
  {path:'', component: IpListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
