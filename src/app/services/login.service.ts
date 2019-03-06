import { User } from './../models/users.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Md5 } from 'ts-md5/dist/md5';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersCollection: AngularFirestoreCollection<User>;
  // possibleCharacters = 'ABCDEFJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  /*   getUsers() {
    return this.usersCollection.snapshotChanges();
  } */

  /*   makeToken(): string {
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += this.possibleCharacters.charAt(Math.floor(Math.random() * this.possibleCharacters.length));
    }
    const md5 = new Md5();
    const token = md5.appendStr(text).end();
    return token.toString();
  } */

  /*   setToken(user: User): void {
    const token: string = this.makeToken();
    localStorage.setItem('token', token);
    user.token = token;
    this.usersCollection.doc(user.userId).update(user);
  } */

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.auth.signOut();
  }

  isLoggedIn(): boolean {
    console.log(this.auth.auth.currentUser);
    return this.auth.auth.currentUser === null ? false : true;
  }
}
