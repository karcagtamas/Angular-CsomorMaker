import { User } from './../models/users.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseAuth } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersCollection: AngularFirestoreCollection<User>;
  possibleCharacters = 'ABCDEFJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private firestore: AngularFirestore, private auth: FirebaseAuth) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  getUsers() {
    return this.usersCollection.snapshotChanges();
  }

  makeToken(): string {
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += this.possibleCharacters.charAt(Math.floor(Math.random() * this.possibleCharacters.length));
    }
    const md5 = new Md5();
    const token = md5.appendStr(text).end();
    return token.toString();
  }

  setToken(user: User): void {
    const token: string = this.makeToken();
    localStorage.setItem('token', token);
    user.token = token;
    this.usersCollection.doc(user.userId).update(user);
  }

  login(email: string, password: string): void | boolean {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  logout(): void | boolean {
    this.auth
      .signOut()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
