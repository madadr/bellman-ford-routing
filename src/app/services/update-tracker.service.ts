import {Injectable} from '@angular/core';
import {UpdateEntry} from '../model/update-entry';

@Injectable({
  providedIn: 'root'
})
export class UpdateTrackerService {
  public updateEntries: UpdateEntry[] = [];

  addEntry(routerId, info, updateData, before, after) {
    this.updateEntries.push({
      routerId: routerId,
      info: info,
      updateData: updateData,
      before: before,
      after: after
    });
  }
}
