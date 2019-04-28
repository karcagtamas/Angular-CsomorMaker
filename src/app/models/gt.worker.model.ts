import { GTWorkerTable } from './gt.worker.table.model';
import { ActiveWork } from './ignore.model';
export class GTWorker {
  name: string;
  works: GTWorkerTable[];
  activeWorks: ActiveWork[];
  isWorker: boolean;
  countOfBigWorks: number;
  countOfSmallWorks: number;

  constructor() {
    this.name = '';
    this.works = [];
    this.activeWorks = [];
    this.isWorker = true;
  }
}
