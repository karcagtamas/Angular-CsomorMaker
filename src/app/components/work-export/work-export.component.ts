import { Work } from './../../models/work.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-work-export',
  templateUrl: './work-export.component.html',
  styleUrls: ['./work-export.component.css']
})
export class WorkExportComponent implements OnInit {
  @Input() Works: Work[];
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
