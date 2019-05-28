import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventCollection: AngularFirestoreCollection<Event>;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private firestore: AngularFirestore) {
    this.eventCollection = this.firestore.collection<Event>('events');
  }

  getEvents(): Observable<DocumentChangeAction<Event>[]> {
    return this.eventCollection.snapshotChanges();
  }

  setVisitor(event: string, value: number): Promise<void> {
    return this.eventCollection.doc(event).update({ visitors: value });
  }

  setInjured(event: string, value: number): Promise<void> {
    return this.eventCollection.doc(event).update({ injured: value });
  }

  addEvent(event: Event): Promise<firestore.DocumentReference> {
    event.visitors = 0;
    event.injured = 0;
    event.creater = localStorage.getItem('user');
    event.playerLimit = 0;
    event.currentPlayers = 0;
    event.visitorLimit = 0;
    event.isLocked = false;
    event.playerCost = 0;
    event.visitorCost = 0;
    event.playerDeposit = 0;
    return this.eventCollection.add(JSON.parse(JSON.stringify(event)));
  }

  deleteEvent(event: string): Promise<void> {
    return this.eventCollection.doc(event).delete();
  }

  updateEvent(event: Event): Promise<void> {
    return this.eventCollection.doc(event.eventId).update(event);
  }

  setNewAd(event: string, value: string[]): Promise<void> {
    return this.eventCollection.doc(event).update({ advertisments: value });
  }

  clearAds(event: string): Promise<void> {
    return this.eventCollection.doc(event).update({ advertisments: [] });
  }

  lockEvent(event: string, value: boolean): Promise<void> {
    return this.eventCollection.doc(event).update({ isLocked: value });
  }
}
