import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.page.html',
  styleUrls: ['./team-modal.page.scss'],
})
export class TeamModalPage implements OnInit {

  @Input() id: string;
  team$: Observable<Team>;

  constructor(private dataService: DataService<Team>,private modalCtrl: ModalController,private toastCtrl: ToastController) { }

  ngOnInit() {
    this.team$=this.dataService.getById('team',this.id);
    console.log(this.team$);
  }

  async updateTeam(team){
    this.dataService.update('team',this.id,team);
    const toast= await this.toastCtrl.create({
      message: 'Játékos adatai frissítve',
      duration: 1000
    });
    toast.present();
  }

  async deleteTeam(){
    await this.dataService.delete('team',this.id);
    this.modalCtrl.dismiss();
  }
}
