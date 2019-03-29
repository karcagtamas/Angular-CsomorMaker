import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Worker } from 'src/app/models/worker.model';

@Component({
  selector: 'app-new-worker-modal',
  templateUrl: './new-worker-modal.component.html',
  styleUrls: ['./new-worker-modal.component.css']
})
export class NewWorkerModalComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  worker: Worker = new Worker();

  constructor(public dialogRef: MatDialogRef<NewWorkerModalComponent>) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
