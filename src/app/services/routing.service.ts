import {Injectable} from '@angular/core';
import {Router} from '../model/router';
import {UpdateTrackerService} from './update-tracker.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public routers: Router[] = [];

  constructor(private updateTracker: UpdateTrackerService) {

  }

  addRouter(id) {
    const newRouter = new Router(id);
    this.routers.push(newRouter);
    this.updateTracker.addEntry(id,
      'Router ' + id + ' created',
      null,
      null,
      [...newRouter.routingTable]
    );
  }

  // TODO: rename&refactor to addLink?
  addInterface(fromId, toId, cost) {
    const router = this.getRouter(fromId);
    const before = [...router.routingTable];
    router.addInterface(toId, cost);

    this.updateTracker.addEntry(fromId,
      'Link ' + fromId + '<->' + toId + ' created',
      null,
      before,
      [...router.routingTable]
    );
  }

  removeRouter(id) {
    const routerIndex = this.routers.findIndex(r => r.id === id);
    if (routerIndex === -1) {
      return;
    }

    const router = this.routers[routerIndex];

    this.updateTracker.addEntry(router.id,
      'Router ' + router.id + ' removed',
      null,
      [...router.routingTable],
      null
    );

    for (const entry of router.interfaces) {
      this.removeInterface(entry.destination, router.id);
    }

    this.routers.splice(routerIndex, 1);
  }

  // TODO: rename&refactor to removeLink
  removeInterface(routerId, interfaceId) {
    const router = this.getRouter(routerId);
    const before = [...router.routingTable];
    router.removeInterface(interfaceId);

    this.updateTracker.addEntry(routerId,
      'Link ' + routerId + '<->' + interfaceId + ' removed',
      null,
      before,
      [...router.routingTable]
    );
  }

  getRouter(id) {
    return this.routers.find(r => r.id === id);
  }
}
