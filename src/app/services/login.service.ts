import { User } from './../models/users.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

interface Login {
  result: string;
  token: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  possibleCharacters = 'ABCDEFJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    /* this.users = this.usersCollection.snapshotChanges().pipe(map(actions => actions.map(a => a{

    }))); */
  }

  login(username: string, password: string): Observable<User[]> {
    return this.users;
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

  setToken(): void {
    const token: string = this.makeToken();
    localStorage.setItem('token', token);
    // this.usersCollection.doc().update();
  }
}
