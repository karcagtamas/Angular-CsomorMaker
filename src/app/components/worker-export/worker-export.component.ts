import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Worker } from 'src/app/models/worker.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-worker-export',
  templateUrl: './worker-export.component.html',
  styleUrls: ['./worker-export.component.css']
})
export class WorkerExportComponent implements OnInit {
  @Input() Workers: Worker[];
  @Output() Capture = new EventEmitter();
  active = '-';

  constructor() {}

  ngOnInit() {}

  capture(exp: HTMLElement, name: string) {
    this.Capture.emit({ exp, name });
  }

  mapItems(value: string) {
    this.active = value;
  }
  disableItems() {
    this.active = '-';
  }
}
