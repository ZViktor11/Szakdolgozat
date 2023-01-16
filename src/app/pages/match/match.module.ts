import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchPageRoutingModule } from './match-routing.module';

import { MatchPage } from './match.page';
import { CreateMatchComponent } from './create-match/create-match.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MatchPage,CreateMatchComponent]
})
export class MatchPageModule {}
