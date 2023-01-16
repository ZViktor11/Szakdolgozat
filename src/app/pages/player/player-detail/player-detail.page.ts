import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
})
export class PlayerDetailPage implements OnInit {
  currentPlayer$: Observable<Player>;
  playerId: string;
  playerTeamId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataServiceTeam: DataService<Team>,
    private dataServicePlayer: DataService<Player>,
    private alerCtrl: AlertController,
    private modalCtrl: ModalController,
  ) {
    this.loadData();
   }

  ngOnInit() {
  }

  loadData(){
    this.playerId=this.activatedRoute.snapshot.paramMap.get('id');
    this.currentPlayer$=this.dataServicePlayer.getById('player',this.playerId);
    this.currentPlayer$.subscribe(res=>{
      this.playerTeamId=res.clubId;
    });
  }

}
