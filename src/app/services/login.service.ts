import { User } from './../models/users.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';

const PASSWORD = 'Abc123456';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersCollection: AngularFirestoreCollection<User>;
  Users: User[] = [];
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

  registration(email: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, PASSWORD);
  }

  saveUser(email: string) {
    const user = { email, isAdmin: false, name: email.split('@')[0], imageName: 'profile.png' };
    this.usersCollection.add(user);
  }

  uploadImage(file: File, userId: string) {
    const storageRef = firebase.storage().ref();
    return new Promise(resolve => {
      storageRef
        .child(`images/${file.name}`)
        .put(file)
        .then(() => {
          this.usersCollection.doc(userId).update({ imageName: file.name });
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  updateName(name: string, userId: string) {
    return this.usersCollection.doc(userId).update({ name });
  }

  getImage(imageName: string) {
    const storageRef = firebase.storage().ref(`images/${imageName}`);
    return storageRef.getDownloadURL();
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

  getUsers() {
    return this.usersCollection.snapshotChanges();
  }

  async getName(): Promise<string> {
    const currentEmail = localStorage.getItem('user');
    return new Promise(resolve => {
      this.getUsers().subscribe(data => {
        this.Users = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as User;
        });
        resolve(this.Users.find(x => x.email === currentEmail).name);
      });
    });
  }

  async getUser(): Promise<User> {
    const currentEmail = localStorage.getItem('user');
    return new Promise(resolve => {
      this.getUsers().subscribe(data => {
        this.Users = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as User;
        });
        resolve(this.Users.find(x => x.email === currentEmail));
      });
    });
  }

  async isAdmin() {
    const currentEmail = localStorage.getItem('user');

    return new Promise(resolve => {
      this.getUsers().subscribe(data => {
        this.Users = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as User;
        });
        for (const i of this.Users) {
          if (i.email === currentEmail && i.isAdmin) {
            resolve(true);
          }
        }
        resolve(false);
      });
    });
  }

  deleteUser(id: string) {
    return this.usersCollection.doc(id).delete();
  }

  setAdmin(id: string, newstate: boolean) {
    return this.usersCollection.doc(id).update({ isAdmin: newstate });
  }

  sendResetEmail() {
    const email = localStorage.getItem('user');
    return this.auth.auth.sendPasswordResetEmail(email);
  }
}
