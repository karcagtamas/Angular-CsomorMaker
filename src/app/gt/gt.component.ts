import { GT } from './../models/gt.model';
import { Component, OnInit } from '@angular/core';
import { GtService } from '../services/gt.service';
import { GTWork } from '../models/gt.work.model';

@Component({
  selector: 'app-gt',
  templateUrl: './gt.component.html',
  styleUrls: ['./gt.component.css']
})
export class GtComponent implements OnInit {
  newWork = '';
  newWorker = '';
  gts: GT[] = [];
  selectedGt = 0;
  gt: GT = null;
  modifiedGt: GT = null;
  gtIsOnModify = false;
  modifyAlert = '';
  workAlert = '';

  constructor(public gtservice: GtService) {}

  ngOnInit() {
    this.gtservice.getGts().subscribe(data => {
      this.gts = data.map(x => {
        return {
          gtId: x.payload.doc.id,
          ...x.payload.doc.data()
        } as GT;
      });
      if (this.gts.length > 0) {
        this.gt = this.gts[0];
      }
    });
  }

  changeGt() {
    this.gt = this.gts[this.selectedGt];
  }

  newGt() {
    const year = new Date().getFullYear();
    if (!this.gts.find(x => x.year === year)) {
      const g = new GT();
      g.year = year;
      this.gtservice.newGt(g);
    }
  }

  modifyGt() {
    this.gtIsOnModify = true;
    this.modifiedGt = { ...this.gt };
  }

  saveModify() {
    if (this.modifiedGt.year && this.modifiedGt.year < 2000) {
      this.modifyAlert = 'Nem megfelelő évszám!';
    } else if (this.modifiedGt.days && this.modifiedGt.days <= 0) {
      this.modifyAlert = 'Nem megfelelő nap szám!';
    } else {
      this.modifyAlert = '';
      this.gt = this.modifiedGt;
      this.gtservice.saveGt(this.gt);
      this.gtIsOnModify = false;
    }
  }

  saveWork(work: string) {
    if (!work) {
      this.workAlert = 'A mező kitöltése kötelező!';
    } else if (this.gt.works && this.gt.works.find(x => x.name === work)) {
      this.workAlert = 'A mező név már szerepel a halmazba!';
    } else {
      const w = new GTWork();
      w.name = work;
      if (!this.gt.works) {
        this.gt.works = [];
      }
      this.gt.works.push(w);
      this.gtservice.saveGt(this.gt);
    }
  }

  saveWorker(worker: string) {}
}
