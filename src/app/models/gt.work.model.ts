import { GTWorkTable } from './gt.work.table.model';
export class GTWork {
  name: string;
  day: number;
  startHour: number;
  endHour: number;
  workers: GTWorkTable[];
  bosses: string[];
  workerCount: number;

  constructor() {
    this.name = '';
    this.bosses = [];
    this.day = 0;
    this.startHour = 0;
    this.endHour = 0;
    this.workerCount = 0;
    this.workers = [];
  }
}
