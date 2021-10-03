import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { CampusComponent } from './views/campus/campus.component';
import { EntryComponent } from './views/entry/entry.component';
import { HomeComponent } from './views/home/home.component';

const redirectLoggedInToCampus = () => redirectLoggedInTo('app/campus');
const redirectUnauthorizedToEntry = () => redirectUnauthorizedTo(['app/campus']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/campus',
  },
  {
    path: 'app',
    pathMatch: 'full',
    redirectTo: 'app/campus',
  },
  {
    path: 'app/campus',
    component: CampusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
