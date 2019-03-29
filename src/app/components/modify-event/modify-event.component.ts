import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.css']
})
export class ModifyEventComponent implements OnInit {
  event: Event;
  name = new FormControl('', [Validators.required]);
  visitors = new FormControl('', [Validators.required]);
  visitorLimit = new FormControl('', [Validators.required]);
  injured = new FormControl('', [Validators.required]);
  playerLimit = new FormControl('', [Validators.required]);
  currentPlayers = new FormControl('', [Validators.required]);
  bosses = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<ModifyEventComponent>, @Inject(MAT_DIALOG_DATA) public data: Event) {}

  ngOnInit() {
    this.event = { ...this.data };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  invalidInput() {
    if (
      this.name.invalid ||
      this.visitors.invalid ||
      this.visitorLimit.invalid ||
      this.injured.invalid ||
      this.playerLimit.invalid ||
      this.currentPlayers.invalid ||
      this.bosses.invalid
    ) {
      return true;
    } else {
      return false;
    }
  }
}
