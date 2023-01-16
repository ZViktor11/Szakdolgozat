import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';
import { AddGoalToPlayerComponent } from '../add-goal-to-player/add-goal-to-player.component';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.page.html',
  styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {
  matchId: string;
  currentMatch$: Observable<Match>;
  currentMatch: Match;
  teamHome$: Observable<Team>;
  teamAway$: Observable<Team>;
  teamHome: Team;
  teamAway: Team;
  q: number;
  p: number;
  started: boolean;
  time: number;
  minutes: string;
  seconds: string;
  teamWB: string;
  playersHome$: Observable<Player[]>;
  playersAway$: Observable<Player[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataServiceMatch: DataService<Match>,
    private dataServiceTeam: DataService<Team>,
    private dataServicePlayer: DataService<Player>,
    private modalCtrl: ModalController
    ) {
    this.matchId=this.activatedRoute.snapshot.paramMap.get('id');
    this.started=false;
    this.currentMatch$=this.dataServiceMatch.getById('match',this.matchId);
    this.currentMatch$.subscribe(res=>{
      this.currentMatch=res;
      this.playersHome$=this.dataServicePlayer.getPlayersFromTeamById('player',res.teamHomeId);
      this.playersAway$=this.dataServicePlayer.getPlayersFromTeamById('player',res.teamAwayId);
      this.teamHome$=this.dataServiceTeam.getById('team',res.teamHomeId);
      this.teamAway$=this.dataServiceTeam.getById('team',res.teamAwayId);
    });
    this.q=0.5;
    this.p=0.5;
    this.teamWB='home';
  }

  ngOnInit() {
  }

  endOfTheMatch(){
    this.currentMatch.finished=true;
    this.dataServiceMatch.update('match',this.matchId,this.currentMatch);
  }

  async addGoalToPlayer(str){
    const modal=await this.modalCtrl.create({
      component: AddGoalToPlayerComponent,
      componentProps:{homeId: this.teamHome.id,awayId: this.teamAway.id,whichTeam: str},
      breakpoints: [0,0.5,0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  addGoal(str){
    this.addGoalToPlayer(str);

    if(str==='home'){
      this.currentMatch.goalsHome++;
    }else if(str==='away'){
      this.currentMatch.goalsAway++;

    }
    if(this.currentMatch.goalsHome===0 && this.currentMatch.goalsAway>0){
      this.q=1;
    }else if(this.currentMatch.goalsAway===0 && this.currentMatch.goalsHome>0){
      this.q=0;
    }else{
    }

    this.dataServiceMatch.update('match',this.matchId,this.currentMatch);

    this.q=this.currentMatch.goalsHome/(this.currentMatch.goalsHome+this.currentMatch.goalsAway);
  }

  teamWithBall(str){
    this.teamWB=str;
  }

  funPossession(){
    if(this.teamWB==='home'){
      this.currentMatch.possessionHome++;
    }else if(this.teamWB==='away'){
      this.currentMatch.possessionAway++;
    }
    if(this.currentMatch.possessionHome===0 && this.currentMatch.possessionAway>0){
      this.p=1;
    }else if(this.currentMatch.possessionAway===0 && this.currentMatch.possessionHome>0){
      this.p=0;
    }
    this.p=this.currentMatch.possessionHome/(this.currentMatch.possessionHome+this.currentMatch.possessionAway);
  }

  startMatch(){
    /* this.currentMatch$=this.dataServiceMatch.getById('match',this.matchId);
    this.currentMatch$.subscribe(res=>{
      this.teamHome$=this.dataServiceTeam.getById('team',res.teamHomeId);
      this.teamAway$=this.dataServiceTeam.getById('team',res.teamAwayId);
    }); */
    this.currentMatch.finished=false;
    this.teamHome$.subscribe(res=>{
      this.teamHome=res;
    });
    this.teamAway$.subscribe(res=>{
      this.teamAway=res;
    });
    this.currentMatch.possessionHome=0;
    this.currentMatch.possessionAway=0;

    this.time=0;
    this.run();
    this.started=true;
  }


  run(){
    setInterval(()=>this.clock(),1000);
  }

  clock(){
    if(!this.currentMatch.finished){
      this.time++;
      this.funPossession();
      if(this.time%60>9){
        this.seconds=(this.time%60).toString();
      }else{
        this.seconds='0'+(this.time%60).toString();
      }
      if(this.time/60>10){
        this.minutes=Math.floor(this.time/60).toString();
      }else{
        this.minutes='0'+Math.floor(this.time/60).toString();
      }
      this.dataServiceMatch.update('match',this.matchId,this.currentMatch);
    }
  }

}
