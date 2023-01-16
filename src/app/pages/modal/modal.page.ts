import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  player$: Observable<Player>;

  constructor(private dataService: DataService<Player>,private modalCtrl: ModalController,private toastCtrl: ToastController) { }

  ngOnInit() {
    this.player$=this.dataService.getById('player',this.id);
  }

  async updatePlayer(player){
    this.dataService.update('player',this.id,player);
    const toast= await this.toastCtrl.create({
      message: 'Játékos adatai frissítve',
      duration: 1000
    });
    toast.present();
  }

  async deletePlayer(){
    await this.dataService.delete('player',this.id);
    this.modalCtrl.dismiss();
  }

}
