import { Component, OnInit, Input } from '@angular/core';
import { GTWork } from 'src/app/models/gt.work.model';

@Component({
  selector: 'app-gt-work-export',
  templateUrl: './gt-work-export.component.html',
  styleUrls: ['./gt-work-export.component.css']
})
export class GtWorkExportComponent implements OnInit {
  @Input() works: GTWork[];
  selectedWork = -1;

  constructor() {}

  ngOnInit() {
    if (this.works.length > 0) {
      this.selectedWork = 0;
    }
  }
}
