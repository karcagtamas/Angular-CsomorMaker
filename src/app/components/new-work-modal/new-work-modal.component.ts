import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-work-modal',
  templateUrl: './new-work-modal.component.html',
  styleUrls: ['./new-work-modal.component.css']
})
export class NewWorkModalComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  work: Work = new Work();

  constructor(public dialogRef: MatDialogRef<NewWorkModalComponent>) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
