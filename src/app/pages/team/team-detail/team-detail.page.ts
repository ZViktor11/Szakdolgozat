/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';
import { ModalPage } from '../../modal/modal.page';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  currentTeam$: Observable<Team>;
  teamId: string;
  players$: Observable<Player[]>;
  playersInClub=[];
  currentTeamName: string;
  i=0;


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
    this.teamId=this.activatedRoute.snapshot.paramMap.get('id');
    this.currentTeam$=this.dataServiceTeam.getById('team',this.teamId);
    this.currentTeam$.subscribe(res=>{
      this.getCurrentTeamPlayers(this.teamId);
      this.currentTeamName=res.name;
    });
  }

  getCurrentTeamPlayers(teamId){
    this.players$=this.dataServicePlayer.getPlayersFromTeamById('player',teamId);
  }


  /* sortPlayers(players){
    this.playersInClub=players;
    this.playersInClub=this.playersInClub.sort((a,b)=>b.name-a.name);
    return this.playersInClub;
  } */


  /* async openPlayer(player){
    const modal=await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: player.id},
      breakpoints: [0,0.5,0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  } */

  async addPlayer(){
    const alert=await this.alerCtrl.create({
      header:'Add Player',
      inputs:[
        {
          name: 'name',
          placeholder: 'X Y',
          type: 'text'
        },
        {
          name: 'age',
          placeholder: 'X',
          type: 'text'
        },
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler:(res)=>{
            this.dataServicePlayer.add('player',{
              name: res.name,
              club: this.currentTeamName,
              age: res.age,
              clubId: this.teamId,
              goals: 0
            });
          }
        }
      ]
    });
    await alert.present();
  }


}





 /*
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id')){
        this.router.navigate(['/home']);
        return;
      }
      const teamId=paramMap.get('id');
      this.dataService.getTeamById(teamId).subscribe(res=>{
        this.getCurrentTeam(res);
      });
    });



    const id=this.activatedRoute.snapshot.paramMap.get('id');
    this.teamId=id;
    this.dataService.getTeamById(id).subscribe(res=>{
      this.currentTeam=res;
    });
    */
