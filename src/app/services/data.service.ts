import { Injectable } from '@angular/core';
import { CollectionReference, AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class DataService<T extends {id?: string}> {

  constructor(private firestore: AngularFirestore) { }

  /*
  getPlayer(): Observable<Player[]>{
    const playerRef=collection(this.firestore,'player');
    return collectionData(playerRef,{idField: 'id'}) as Observable<Player[]>;
  }

  getPlayerById(id: string): Observable<Player>{
    const playerDocRef=doc(this.firestore,`player/${id}`);
    return docData(playerDocRef,{ idField: 'id' }) as Observable<Player>;
  }

  addPlayer(player: Player){
    const playerRef=collection(this.firestore,'player');
    return addDoc(playerRef,player);
  }

  deletePlayer(player: Player){
    const playerDocRef=doc(this.firestore,`player/${player.id}`);
    return deleteDoc(playerDocRef);
  }

  updatePlayer(player: Player){
    const playerDocRef= doc(this.firestore,`player/${player.id}`);
    return updateDoc(playerDocRef,{name: player.name,age: player.age,club: player.club});
  }

  getTeam(): Observable<Team[]>{
    const teamRef=collection(this.firestore,'team');
    return collectionData(teamRef,{idField: 'id'}) as Observable<Team[]>;
  }

  getTeamById(id: string): Observable<Team>{
    const teamDocRef=doc(this.firestore,`team/${id}`);
    return docData(teamDocRef,{ idField: 'id' }) as Observable<Team>;
  }

  addTeam(team: Team){
    const teamRef=collection(this.firestore,'team');
    return addDoc(teamRef,team);
  }

  deleteTeam(team: Team){
    const teamDocRef=doc(this.firestore,`team/${team.id}`);
    return deleteDoc(teamDocRef);
  }

  updateTeam(team: Team){
    const teamDocRef= doc(this.firestore,`team/${team.id}`);
    return updateDoc(teamDocRef,{name: team.name,address: team.address,points: team.points});
  }

  getPlayerByClub(club: string): Observable<Player[]>{
    const playerRef=collection(this.firestore,'player');
    return collectionData(playerRef,{idField: 'id'}) as Observable<Player[]>;
  }

  */

  //tslint:disable-next-line: typedef
  get(collectionName: string): Observable<T[]> {
    return this.firestore.collection(collectionName).valueChanges() as Observable<T[]>;
  }

  async add(collectionName: string, data: T, id?: string): Promise<string> {
    const uid = id ? id : this.firestore.createId();
    data.id = uid;
    await this.firestore.collection(collectionName).doc(uid).set(data);
    return uid;
  }

  // tslint:disable-next-line: typedef
  weakAdd(collectionName: string, data: T) {
    return this.firestore.collection(collectionName).add(data).then(
      result => { console.log(result); }, err => { console.log(err); }).finally(() => { console.log('finally'); });
  }

  getById(collectionName: string, id: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(id).valueChanges();
  }

  update(collectionName: string, id: string, data: T): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data).then(
      result => { console.log(result); }, err => { console.log(err); }).finally(() => { console.log('finally'); });
  }

  delete(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }

  getPlayersFromTeamById(collectionName: string, teamId: string): Observable<Player[]>{
    return this.firestore.collection(collectionName,ref=>ref.where('clubId','==',teamId)).valueChanges() as Observable<Player[]>;
  }

  getPlayersFromTeam(collectionName: string, teamId: string){
    return this.firestore.collection(collectionName,ref=>ref.where('clubId','==',teamId)) as any;
  }

  getTeamsOrderByPoints(collectionName: string): Observable<Team[]>{
    return this.firestore.collection(collectionName,ref=>ref.orderBy('points','desc')).valueChanges() as Observable<Team[]>;
  }

  getTableSeason(collectionName: string, season: string,league: string): Observable<Match[]>{
    return this.firestore.collection(collectionName,ref=>ref.where('season','==',season).where('league','==',league)).valueChanges() as any;
  }

}
