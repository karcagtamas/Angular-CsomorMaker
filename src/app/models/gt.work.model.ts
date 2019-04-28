export class GTWork {
  name: string;
  day: number;
  startHour: number;
  endHour: number;
  workers: string[];
  bosses: string[];
  workerCount: number;
  isBig: boolean;

  constructor() {
    this.name = '';
    this.bosses = [];
    this.day = 0;
    this.startHour = 0;
    this.endHour = 0;
    this.workerCount = 0;
    this.workers = [];
    this.isBig = false;
  }
}
