import { GTClass } from './gt.class.model';
import { GTWork } from './gt.work.model';
import { GTWorker } from './gt.worker.model';

export class GT {
  gtId: string;
  year: number;
  workers: GTWorker[];
  works: GTWork[];
  classes: GTClass[];
  bosses: string[];
  tShirtColor: string[];
  days: number;
}
