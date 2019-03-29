import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Event } from '../models/event.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class PortaService {
  eventCollection: AngularFirestoreCollection<Event>;

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.eventCollection = this.firestore.collection<Event>('events');
  }

  getEvents() {
    return this.eventCollection.snapshotChanges();
  }

  setVisitor(event: string, value: number) {
    this.eventCollection.doc(event).update({ visitors: value });
  }

  setInjured(event: string, value: number) {
    this.eventCollection.doc(event).update({ injured: value });
  }

  addEvent(event: Event) {
    event.visitors = 0;
    event.injured = 0;
    event.creater = this.auth.auth.currentUser.email;
    event.playerLimit = 0;
    event.currentPlayers = 0;
    event.visitorLimit = 0;
    this.eventCollection.add(JSON.parse(JSON.stringify(event)));
  }

  deleteEvent(event: string) {
    this.eventCollection.doc(event).delete();
  }

  updateEvent(event: Event) {
    this.eventCollection.doc(event.eventId).update(event);
  }

  setNewAd(event: string, value: string[]) {
    this.eventCollection.doc(event).update({ advertisments: value });
  }
}
