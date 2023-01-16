import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamModalPageRoutingModule } from './team-modal-routing.module';

import { TeamModalPage } from './team-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamModalPageRoutingModule
  ],
  declarations: [TeamModalPage]
})
export class TeamModalPageModule {}
