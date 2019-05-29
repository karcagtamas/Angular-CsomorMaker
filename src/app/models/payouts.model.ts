export class PayOut {
  name: string;
  from: string;
  to: string;
  cost: number;
  type: string;

  constructor() {
    this.name = '';
    this.from = '';
    this.to = '';
    this.cost = 0;
    this.type = 'output';
  }
}
