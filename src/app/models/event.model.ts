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
  playerLimit: number;
  currentPlayers: number;
  generator?: Generator;
  isLocked: boolean;
}
