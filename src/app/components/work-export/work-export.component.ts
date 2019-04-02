import { Work } from './../../models/work.model';
import { Component, OnInit, Input } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-work-export',
  templateUrl: './work-export.component.html',
  styleUrls: ['./work-export.component.css']
})
export class WorkExportComponent implements OnInit {
  @Input() Works: Work[];
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
    this.active = '';
  }
}
