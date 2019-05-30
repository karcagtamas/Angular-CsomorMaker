import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { ChatMessage } from './../models/chat.model';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatCollection: AngularFirestoreCollection<ChatMessage>;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private firestore: AngularFirestore) {
    this.chatCollection = this.firestore.collection<ChatMessage>('chat');
  }

  getMessages() {
    return this.chatCollection.snapshotChanges();
  }

  sendMessage() {}
}
