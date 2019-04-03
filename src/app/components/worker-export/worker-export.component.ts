import { Component, OnInit, Input } from '@angular/core';
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
  active = '';

  constructor() {}

  ngOnInit() {}

  capture(exp: HTMLElement, name: string) {
    html2canvas(exp).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(name + '.pdf');
    });
  }

  mapItems(value: string) {
    this.active = value;
  }
  disableItems() {
    this.active = '-';
  }
}
