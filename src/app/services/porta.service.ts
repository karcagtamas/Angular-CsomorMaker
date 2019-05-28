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
}
