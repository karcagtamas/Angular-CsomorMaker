import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/users.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  Users: User[] = [];

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  getUsers() {
    return this.usersCollection.snapshotChanges();
  }

  async getUser(email?): Promise<User> {
    const currentEmail = email ? email : localStorage.getItem('user');
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

  async getEmail(): Promise<string> {
    return new Promise(resolve => {
      this.getUser().then(res => {
        resolve(res.email);
      });
    });
  }

  async getName(): Promise<string> {
    return new Promise(resolve => {
      this.getUser().then(res => {
        resolve(res.name);
      });
    });
  }

  async isAdmin(): Promise<boolean> {
    return new Promise(resolve => {
      this.getUser().then(res => {
        resolve(res.isAdmin);
      });
    });
  }

  saveUser(email: string): Promise<firestore.DocumentReference> {
    const user = { email, isAdmin: false, name: email.split('@')[0], imageName: 'profile.png' };
    return this.usersCollection.add(user);
  }

  uploadImage(file: File, userId: string): Promise<boolean> {
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

  getImage(imageName: string): Promise<any> {
    const storageRef = firebase.storage().ref(`images/${imageName}`);
    return storageRef.getDownloadURL();
  }

  updateName(name: string, userId: string): Promise<void> {
    return this.usersCollection.doc(userId).update({ name });
  }

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }

  setAdmin(id: string, newstate: boolean): Promise<void> {
    return this.usersCollection.doc(id).update({ isAdmin: newstate });
  }
}
