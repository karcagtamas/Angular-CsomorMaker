import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-work-export',
  templateUrl: './simple-work-export.component.html',
  styleUrls: ['./simple-work-export.component.css']
})
export class SimpleWorkExportComponent implements OnInit {
  @Input() Works: Work[];
  @Output() Capture = new EventEmitter();
  active = '-';
  selectedWork = 0;
  workselect = new FormControl('', [Validators.required]);

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
