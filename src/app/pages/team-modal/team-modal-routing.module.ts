import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamModalPage } from './team-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TeamModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamModalPageRoutingModule {}
