import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-goal-to-player',
  templateUrl: './add-goal-to-player.component.html',
  styleUrls: ['./add-goal-to-player.component.scss'],
})
export class AddGoalToPlayerComponent implements OnInit {
  @Input() homeId: string;
  @Input() awayId: string;
  @Input() whichTeam: string;
  players$: Observable<Player[]>;
  selectedPlayer: Player;

  constructor(private dataServicePlayer: DataService<Player>,private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.whichTeam==='home'){
      this.players$=this.dataServicePlayer.getPlayersFromTeamById('player',this.homeId);
    }else if(this.whichTeam==='away'){
      this.players$=this.dataServicePlayer.getPlayersFromTeamById('player',this.awayId);
    }
  }

  submitGoal(){
    this.selectedPlayer.goals++;
    this.dataServicePlayer.update('player',this.selectedPlayer.id,this.selectedPlayer);
    this.modalCtrl.dismiss();
  }

}
