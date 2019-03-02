import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/users.model';
import { Observable } from 'rxjs';

interface Login {
  result: string;
  token: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  possibleCharacters = 'ABCDEFJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  constructor(private firestore: AngularFirestore) {}

  login(username: string, password: string): Observable<any> {
    return this.firestore.collection('users').valueChanges();
  }

  makeToken(): string {
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += this.possibleCharacters.charAt(Math.floor(Math.random() * this.possibleCharacters.length));
    }
    return text;
  }
}
