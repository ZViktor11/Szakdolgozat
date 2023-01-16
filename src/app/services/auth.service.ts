import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  async logout(): Promise<void>{
    await this.auth.signOut();
}

  login(email: string,password: string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  currentUser(): any{
    return this.auth.authState;
  }
}
