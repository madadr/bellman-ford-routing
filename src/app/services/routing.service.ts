import {Injectable} from '@angular/core';
import {Router} from '../model/router';
import {UpdateTrackerService} from './update-tracker.service';
import {Computer} from '../model/computer';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public routers: Router[] = [];
  public computers: Computer[] = [];

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

  addComputer(id) {
    const newComputer = new Computer(id, this);
    this.computers.push(newComputer);
    this.updateTracker.addEntry(id,
      'Computer ' + id + ' created',
      null,
      null,
      null
    );
  }

  addInterface(fromId, toId, cost) {
    if (fromId.startsWith('R')) {
      this.addLinkFromRouter(fromId, toId, cost);
    } else if (fromId.startsWith('PC')) {
      this.addLinkFromComputer(fromId, toId, cost);
    }
  }

  addLinkFromRouter(fromId, toId, cost) {
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

  addLinkFromComputer(fromId, toId, cost) {
    const computer = this.getComputer(fromId);
    computer.addInterface(toId, cost);


    this.updateTracker.addEntry(fromId,
      'Link ' + fromId + '<->' + toId + ' created',
      null,
      null,
      [{destination: toId, cost: 0, nextHop: toId}]
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

  removeComputer(id) {
    const pcIndex = this.computers.findIndex(r => r.id === id);
    if (pcIndex === -1) {
      return;
    }

    const computer = this.computers[pcIndex];

    if (computer.interface != null) {
      this.removeInterface(computer.interface.destination, id);
    }

    this.updateTracker.addEntry(computer.id,
      'Computer ' + computer.id + ' removed',
      null,
      null,
      null
    );

    this.computers.splice(pcIndex, 1);
  }

  removeInterface(nodeId, interfaceId) {
    if (nodeId.startsWith('PC')) {
      const computer = this.getComputer(nodeId);
      computer.removeInterface();

      this.updateTracker.addEntry(nodeId,
        'Link ' + nodeId + '<->' + interfaceId + ' removed',
        null,
        null,
        null
      );
    } else {
      const router = this.getRouter(nodeId);
      const before = [...router.routingTable];
      router.removeInterface(interfaceId);

      this.updateTracker.addEntry(nodeId,
        'Link ' + nodeId + '<->' + interfaceId + ' removed',
        null,
        before,
        [...router.routingTable]
      );
    }
  }

  getRouter(id): Router {
    return this.routers.find(r => r.id === id);
  }

  getComputer(id): Computer {
    return this.computers.find(r => r.id === id);
  }

  sendUpdates(id) {
    const router = this.getRouter(id);

    for (const entry of router.interfaces) {
      if (entry.destination.startsWith('PC')) {
        continue;
      }

      const interfaceRouter = this.getRouter(entry.destination);
      const before = [...interfaceRouter.routingTable];
      const updateData = router.routingTable.slice(1, router.routingTable.length);

      interfaceRouter.updateRoutingTable(id, updateData);
      this.updateTracker.addEntry(interfaceRouter.id,
        'Router ' + interfaceRouter.id + ' received update from ' + id,
        updateData,
        before,
        [...interfaceRouter.routingTable]
      );
    }
  }
}
