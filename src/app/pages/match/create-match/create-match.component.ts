import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss'],
})
export class CreateMatchComponent implements OnInit {

  /* form: FormGroup= new FormGroup({
    id: new FormControl(''),
    season: new FormControl(''),
    league: new FormControl(''),
    teamHome: new FormControl(''),
    teamAway: new FormControl(''),
  }); */

  leagues: string[]=['I. Osztály'];
  seasons: string[]=['2022/23'];
  selectedHomeId: string;
  selectedAwayId: string;
  selectedLeague: string;
  selectedSeason: string;
  teams$: Observable<Team[]>;


  constructor(private dataServiceTeam: DataService<Team>,private dataServiceMatch: DataService<Match>) {
    this.teams$=this.dataServiceTeam.get('team');
   }

  ngOnInit() {}

  addMatch(){
    this.dataServiceMatch.add('match',{
      teamHomeId: this.selectedHomeId,
      teamAwayId: this.selectedAwayId,
      league: this.selectedLeague,
      season: this.selectedSeason,
      goalsAway: 0,
      goalsHome: 0,
      possessionAway: 0,
      possessionHome: 0,
      finished: false
    });
  }




}
