import { Worker } from './worker.model';
import { Work } from './work.model';
export class Generator {
  works: Work[];
  workers: Worker[];
  start: number;
  end: number;
  days: number;
  length: number;
  eventId?: string;
  ready: boolean;
}
