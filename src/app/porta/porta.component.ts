import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewEventModalComponent } from '../components/new-event-modal/new-event-modal.component';
import { ModifyEventComponent } from '../components/modify-event/modify-event.component';
import { isUndefined } from 'util';
import { AddAdModalComponent } from '../components/add-ad-modal/add-ad-modal.component';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-porta',
  templateUrl: './porta.component.html',
  styleUrls: ['./porta.component.css']
})
export class PortaComponent implements OnInit {
  Events: Event[] = null;
  nameOnModify = false;
  isAdmin = false;

  constructor(private eventservice: EventService, public dialog: MatDialog, private userservice: UserService) {}

  ngOnInit() {
    this.eventservice.getEvents().subscribe(data => {
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
    this.userservice
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
      this.eventservice.setVisitor(event, +value + 1);
    }
  }

  decrementVisitors(event: string, value: number) {
    if (value !== 0) {
      this.eventservice.setVisitor(event, +value - 1);
    }
  }

  incrementInjured(event: string, value: number) {
    this.eventservice.setInjured(event, +value + 1);
  }

  decrementInjured(event: string, value: number) {
    if (value !== 0) {
      this.eventservice.setInjured(event, +value - 1);
    }
  }

  deleteEvent(event: string) {
    if (!this.Events.find(x => x.eventId === event).isLocked) {
      this.eventservice.deleteEvent(event);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewEventModalComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.eventservice.addEvent(result);
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
        this.eventservice.updateEvent(result);
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
        this.eventservice.setNewAd(event, value);
      }
    });
  }

  clearAds(event: string) {
    this.eventservice.clearAds(event);
  }

  lock(event: string, value: boolean) {
    this.eventservice.lockEvent(event, value);
  }
}
