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

  saveWork(work: string) {
    if (!this.gt.works.find(x => x.name === work)) {
      const w = new GTWork();
      w.name = work;
      console.log(this.gt);
      if (!this.gt.works) {
        this.gt.works = [];
      }
      this.gt.works.push(w);
      this.gtservice.saveGt(this.gt);
    }
  }

  saveWorker(worker: string) {}
}
