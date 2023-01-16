import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchPage } from './match.page';

const routes: Routes = [
  {
    path: '',
    component: MatchPage
  },
  {
    path: 'match-detail',
    loadChildren: () => import('./match-detail/match-detail.module').then( m => m.MatchDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchPageRoutingModule {}
