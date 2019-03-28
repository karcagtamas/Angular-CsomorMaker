import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-ad-modal',
  templateUrl: './add-ad-modal.component.html',
  styleUrls: ['./add-ad-modal.component.css']
})
export class AddAdModalComponent implements OnInit {
  textControl = new FormControl('', [Validators.required]);
  text = '';

  constructor(public dialogRef: MatDialogRef<AddAdModalComponent>) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
