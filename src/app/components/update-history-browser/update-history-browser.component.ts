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
    this.addUpdateEntry('R9',
      'Update from R3',
      [{destination: 'R4', nextHop: 'R2', cost: 3},
        {destination: 'R1', nextHop: 'R2', cost: 3}],
      [{destination: 'R4', nextHop: 'R2', cost: 3},
        {destination: 'R1', nextHop: 'R3', cost: 1}],
      [{destination: 'R1', nextHop: 'R11', cost: 1},
        {destination: 'R4', nextHop: 'R11', cost: 22}]);
    this.addUpdateEntry('R7',
      'Update from R8',
      [{destination: 'R9', nextHop: 'R1', cost: 3},
      {destination: 'R1', nextHop: 'R2', cost: 3}],
      [{destination: 'R9', nextHop: 'R2', cost: 3},
        {destination: 'R1', nextHop: 'R3', cost: 1}],
      [{destination: 'R1', nextHop: 'R1', cost: 1},
        {destination: 'R4', nextHop: 'R11', cost: 22}]);
  }

  addUpdateEntry(routerId, info, before, after, updateData) {
    this.updateTracker.updateEntries.push({
      routerId: routerId,
      info: info,
      before: before,
      after: after,
      updateData: updateData
    });
  }
}
