import {Component, Input} from '@angular/core';
import {RoutingEntry} from '../../model/routing-entry';

@Component({
  selector: 'app-routing-table',
  templateUrl: './routing-table.component.html',
  styleUrls: ['./routing-table.component.scss']
})
export class RoutingTableComponent {
  @Input() routerId: string = null;
  @Input() routingTable: RoutingEntry[] = null;
  @Input() skipNextHop = false;
}
