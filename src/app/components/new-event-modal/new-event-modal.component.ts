import { Event } from './../../models/event.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.css']
})
export class NewEventModalComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  Event = new Event();

  constructor(public dialogRef: MatDialogRef<NewEventModalComponent>) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
