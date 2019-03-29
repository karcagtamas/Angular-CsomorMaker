import { Generator } from './../../models/generator.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-new-generator-modal',
  templateUrl: './new-generator-modal.component.html',
  styleUrls: ['./new-generator-modal.component.css']
})
export class NewGeneratorModalComponent implements OnInit {
  start = new FormControl('', [Validators.required]);
  end = new FormControl('', [Validators.required]);
  days = new FormControl('', [Validators.required]);
  eventselect = new FormControl('', [Validators.required]);
  Events: Event[] = [];
  Generator = new Generator();

  constructor(
    public dialogRef: MatDialogRef<NewGeneratorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event[]
  ) {}

  ngOnInit() {
    this.Events = [...this.data];
    console.log(this.data);
    console.log(this.Events);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
