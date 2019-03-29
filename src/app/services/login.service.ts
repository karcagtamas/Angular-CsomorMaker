import { User } from './../models/users.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Md5 } from 'ts-md5/dist/md5';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersCollection: AngularFirestoreCollection<User>;
  // possibleCharacters = 'ABCDEFJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.auth.signOut();
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.auth.authState.pipe(first()).toPromise();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
