import { Component, OnInit, Input } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import { Worker } from 'src/app/models/worker.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export-csomor',
  templateUrl: './export-csomor.component.html',
  styleUrls: ['./export-csomor.component.css']
})
export class ExportCsomorComponent implements OnInit {
  @Input() Workers: Worker[];
  @Input() Works: Work[];
  selectedExport = 1;
  constructor() {}

  ngOnInit() {}

  capture(event) {
    html2canvas(event.exp).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(event.name + '.pdf');
    });
  }
}
