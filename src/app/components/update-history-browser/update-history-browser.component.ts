import {Component} from '@angular/core';
import {UpdateTrackerService} from '../../services/update-tracker.service';

@Component({
  selector: 'app-update-history-browser',
  templateUrl: './update-history-browser.component.html',
  styleUrls: ['./update-history-browser.component.scss']
})
export class UpdateHistoryBrowserComponent {
  private page = 1;

  constructor(public updateTracker: UpdateTrackerService) {
  }
}
