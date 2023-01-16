import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then( m => m.PlayerPageModule)
  },

  {
    path: 'team',
    loadChildren: () => import('./pages/team/team.module').then( m => m.TeamPageModule)
    /*
    children:[
      {
        path:'',
        loadChildren: () => import('./pages/team/team.module').then( m => m.TeamPageModule)
      },
      {
        path:':teamId',
        loadChildren: () => import('./pages/team/team-detail/team-detail.module').then( m => m.TeamDetailPageModule)
      }
    ]*/

  },
  {
    path:'team/:id',
    loadChildren: () => import('./pages/team/team-detail/team-detail.module').then( m => m.TeamDetailPageModule)
  },
  {
    path:'player/:id',
    loadChildren: () => import('./pages/player/player-detail/player-detail.module').then( m => m.PlayerDetailPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'team-modal',
    loadChildren: () => import('./pages/team-modal/team-modal.module').then( m => m.TeamModalPageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then( m => m.PlayerPageModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./pages/match/match.module').then( m => m.MatchPageModule)
  },
  {
    path:'match/:id',
    loadChildren: () => import('./pages/match/match-detail/match-detail.module').then( m => m.MatchDetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
