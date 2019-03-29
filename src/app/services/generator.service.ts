import { Event } from 'src/app/models/event.model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Generator } from '../models/generator.model';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  eventCollection: AngularFirestoreCollection<Event>;
  constructor(private firestore: AngularFirestore) {
    this.eventCollection = this.firestore.collection<Event>('events');
  }
  getEvents() {
    return this.eventCollection.snapshotChanges();
  }

  newGenerator(event: string, generator: Generator) {
    this.eventCollection.doc(event).update({ generator: JSON.parse(JSON.stringify(generator)) });
  }
}
