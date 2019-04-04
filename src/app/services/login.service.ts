import { User } from './../models/users.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Md5 } from 'ts-md5/dist/md5';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';

interface Admin {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersCollection: AngularFirestoreCollection<User>;
  adminCollection: AngularFirestoreCollection<Admin>;
  Admins: Admin[] = [];
  // possibleCharacters = 'ABCDEFJGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.usersCollection = this.firestore.collection<User>('users');
    this.adminCollection = this.firestore.collection<any>('admin');
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

  async getEmail(): Promise<string> {
    const user = await this.auth.authState.pipe(first()).toPromise();
    if (user) {
      // user.updateProfile({ displayName: user.email, photoURL: '' });
      return user.email;
    } else {
      return '';
    }
  }

  async getAdmins() {
    return await this.adminCollection.snapshotChanges();
  }

  async isAdmin() {
    const currentEmail = localStorage.getItem('user');
    const a = await this.getAdmins();

    return new Promise(resolve => {
      a.subscribe(data => {
        this.Admins = data.map(e => {
          return {
            ...e.payload.doc.data()
          } as Admin;
        });
        for (const i of this.Admins) {
          if (i.email === currentEmail) {
            resolve(true);
          }
        }
        resolve(false);
      });
    });
  }
}
