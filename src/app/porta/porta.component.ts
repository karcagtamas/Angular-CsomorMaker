import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { PortaService } from '../services/porta.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewEventModalComponent } from '../components/new-event-modal/new-event-modal.component';
import { ModifyEventComponent } from '../components/modify-event/modify-event.component';
import { isUndefined } from 'util';
import { AddAdModalComponent } from '../components/add-ad-modal/add-ad-modal.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-porta',
  templateUrl: './porta.component.html',
  styleUrls: ['./porta.component.css']
})
export class PortaComponent implements OnInit {
  Events: Event[] = null;
  nameOnModify = false;
  isAdmin = false;

  constructor(private portaservice: PortaService, public dialog: MatDialog, private loginservice: LoginService) {}

  ngOnInit() {
    this.portaservice.getEvents().subscribe(data => {
      this.Events = data.map(e => {
        return {
          eventId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
    });
    this.getIsAdmin();
  }

  getIsAdmin() {
    this.loginservice
      .isAdmin()
      .then(res => {
        if (res) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      })
      .catch(() => (this.isAdmin = false));
  }

  incrementVisitors(event: string, value: number, max: number) {
    if (max !== value) {
      this.portaservice.setVisitor(event, +value + 1);
    }
  }

  decrementVisitors(event: string, value: number) {
    if (value !== 0) {
      this.portaservice.setVisitor(event, +value - 1);
    }
  }

  incrementInjured(event: string, value: number) {
    this.portaservice.setInjured(event, +value + 1);
  }

  decrementInjured(event: string, value: number) {
    if (value !== 0) {
      this.portaservice.setInjured(event, +value - 1);
    }
  }

  deleteEvent(event: string) {
    this.portaservice.deleteEvent(event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewEventModalComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.portaservice.addEvent(result);
      }
    });
  }
  openModify(event: Event) {
    const dialogRef = this.dialog.open(ModifyEventComponent, { width: '300px', data: event });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        result.currentPlayers = +result.currentPlayers;
        result.playerLimit = +result.playerLimit;
        result.visitorLimit = +result.visitorLimit;
        result.visitors = +result.visitors;
        result.injured = +result.injured;
        this.portaservice.updateEvent(result);
      }
    });
  }

  openAddAd(event: string, value: string[]) {
    const dialogRef = this.dialog.open(AddAdModalComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        const str: string = result;
        if (!value) {
          value = [];
        }
        value.push(str.replace(/\n/g, '<br>'));
        this.portaservice.setNewAd(event, value);
      }
    });
  }

  clearAds(event: string) {
    this.portaservice.clearAds(event);
  }
}
