import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

  players$: Observable<Player[]>;
  results=[];

  constructor(private dataService: DataService<Player>) {
    this.players$=this.dataService.get('player');
    this.players$.subscribe(res=>{
      this.results=res;
    });
  }

  ngOnInit() {
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.players$.subscribe(res=>{
      this.results = res.filter(d => d.name.toLowerCase().indexOf(query) > -1);
    });


  }

}
