import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { GT } from '../models/gt.model';

@Injectable({
  providedIn: 'root'
})
export class GtService {
  gtCollection: AngularFirestoreCollection<GT>;

  constructor(private firestore: AngularFirestore) {
    this.gtCollection = this.firestore.collection<GT>('gts');
  }

  getGts() {
    return this.gtCollection.snapshotChanges();
  }

  newGt(gt: GT) {
    this.gtCollection.add(JSON.parse(JSON.stringify(gt)));
  }

  saveGt(gt: GT) {
    this.gtCollection.doc(gt.gtId).update(JSON.parse(JSON.stringify(gt)));
  }
}
