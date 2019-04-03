import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Worker } from 'src/app/models/worker.model';

@Component({
  selector: 'app-simple-worker-export',
  templateUrl: './simple-worker-export.component.html',
  styleUrls: ['./simple-worker-export.component.css']
})
export class SimpleWorkerExportComponent implements OnInit {
  @Input() Workers: Worker[];
  @Output() Capture = new EventEmitter();
  active = '-';
  selectedWorker = 0;
  workerselect = new FormControl('', [Validators.required]);

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
