import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Event } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortaService {
  eventCollection: AngularFirestoreCollection<Event>;

  constructor(private firestore: AngularFirestore) {
    this.eventCollection = this.firestore.collection<Event>('events');
  }

  getEvents() {
    return this.eventCollection.snapshotChanges();
  }

  setVisitor(event: string, value: number) {
    this.eventCollection.doc(event).update({ visitors: value });
  }
}
