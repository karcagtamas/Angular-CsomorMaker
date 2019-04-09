import { WorkerTable } from './worker.table.model';
import { ActiveWork } from './ignore.model';

export class Worker {
  name: string;
  table: WorkerTable[];
  workerHours: number;
  activeWorks: ActiveWork[];
}
