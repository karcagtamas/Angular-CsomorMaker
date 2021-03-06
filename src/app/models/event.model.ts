import { PayOut } from './payouts.model';
import { Generator } from './generator.model';
export class Event {
  eventId: string;
  name: string;
  bosses: string[];
  creater: string;
  injured: number;
  visitors: number;
  advertisments: string[];
  visitorLimit: number;
  visitorCost: number;
  playerLimit: number;
  currentPlayers: number;
  playerCost: number;
  playerDeposit: number;
  generator?: Generator;
  isLocked: boolean;
  payOuts: PayOut[];
  disabled: boolean;

  constructor() {
    this.advertisments = [];
    this.bosses = [];
    this.payOuts = [];
  }
}
