import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchDetailPageRoutingModule } from './match-detail-routing.module';

import { MatchDetailPage } from './match-detail.page';
import { AddGoalToPlayerComponent } from '../add-goal-to-player/add-goal-to-player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchDetailPageRoutingModule
  ],
  declarations: [MatchDetailPage,AddGoalToPlayerComponent]
})
export class MatchDetailPageModule {}
