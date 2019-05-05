import {RoutingEntry} from './routing-entry';

export class UpdateEntry {
  routerId: string;
  info: string;
  before: RoutingEntry[];
  after: RoutingEntry[];
  updateData: RoutingEntry[];
}
