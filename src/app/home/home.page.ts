import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Team } from '../models/team';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Match } from '../models/match';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  teams$: Observable<Team[]>;
  leagues=['I. Osztály','II. Osztály','III. Osztály'];
  seasons=['2022/23','2021/22'];
  selectedLeague: string;
  selectedSeason: string;
  matches$: Observable<Match[]>;
  matches: Match[];
  currentMatches: Array<Match>;

  constructor(private dataServiceMatch: DataService<Match>,private dataServiceTeam: DataService<Team>,private router: Router) {
    this.teams$=this.dataServiceTeam.getTeamsOrderByPoints('team');
    this.matches$=this.dataServiceMatch.get('match');
    this.matches$.subscribe(ref=>{
      this.matches=ref;
    });
    this.selectedLeague='I. Osztály';
    this.selectedSeason='2022/23';
  }

  ngOnInit(): void {
  }

  changeTable(){
    this.currentMatches=[];
    this.matches.forEach(element => {
      if(element.season===this.selectedSeason && element.league===this.selectedLeague){
        this.currentMatches.push(element);
      }
    });
    this.calcTable(this.currentMatches);
  }

  calcTable(cMatches){
    cMatches.forEach(element=>{
      console.log(element);
      if(element.goalsAway>element.goalsHome){
      }
    });
  }

/*
  sortTeams() {
    return (this.teams as unknown as Team[]).sort((a, b) => b.points-a.points);
  }*/


}
