import {Injectable} from '@angular/core';
import {UpdateEntry} from '../model/update-entry';

@Injectable({
  providedIn: 'root'
})
export class UpdateTrackerService {
  public updateEntries: UpdateEntry[] = [];
}
