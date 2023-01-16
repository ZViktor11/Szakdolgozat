import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { CreateMatchComponent } from './create-match/create-match.component';
import { Team } from 'src/app/models/team';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  matches$: Observable<Match[]>;

  constructor(private dataServiceMatch: DataService<Match>,private modalCtrl: ModalController) {
    this.matches$=this.dataServiceMatch.get('match');
   }

  ngOnInit() {
  }

  async createMatch(){
    const modal=await this.modalCtrl.create({
      component: CreateMatchComponent,
      breakpoints: [0,0.5,0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

}
