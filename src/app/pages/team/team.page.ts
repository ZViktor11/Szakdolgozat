import { Component, OnInit } from '@angular/core';
import { documentId, Firestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';
import { ModalPage } from '../modal/modal.page';
import { TeamModalPage } from '../team-modal/team-modal.page';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  teams$: Observable<Team[]>;

  constructor(private dataService: DataService<Team>,private alerCtrl: AlertController,private modalCtrl: ModalController) {
    this.teams$=this.dataService.get('team');
   }

  ngOnInit() {
  }

  /* async openTeam(team){
    console.log(team);
    const modal=await this.modalCtrl.create({
      component: TeamModalPage,
      componentProps: {id: team.id},
      breakpoints: [0,0.5,0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  } */

  async addTeam(){
    const alert=await this.alerCtrl.create({
      header:'Add Team',
      inputs:[
        {
          name: 'name',
          placeholder: 'X Y',
          type: 'text'
        },
        {
          name: 'address',
          placeholder: 'XY XY  utca',
          type: 'text'
        },
        {
          name: 'points',
          placeholder: 'X',
          type: 'text'
        },
        {
          name: 'league',
          placeholder: 'league',
          type: 'text'
        },
        {
          name: 'season',
          placeholder: 'season',
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
            this.dataService.add('team',{
              name: res.name,
              address: res.address,
              points: res.points,
              league: res.league,
              season: res.season
            });
          }
        }
      ]
    });
    await alert.present();
  }





}
