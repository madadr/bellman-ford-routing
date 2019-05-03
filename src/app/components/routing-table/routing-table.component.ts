import {Component, Input, OnInit} from '@angular/core';
import {Router} from '../../model/router';

@Component({
  selector: 'app-routing-table',
  templateUrl: './routing-table.component.html',
  styleUrls: ['./routing-table.component.scss']
})
export class RoutingTableComponent {
  @Input() router: Router;
}
