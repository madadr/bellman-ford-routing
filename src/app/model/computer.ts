import {RoutingEntry} from './routing-entry';
import {RoutingService} from '../services/routing.service';

export class Computer {
  public interface: RoutingEntry;

  constructor(public readonly id: string,  private routingService: RoutingService) {
  }

  addInterface(routerId, cost) {
    this.interface = {destination: routerId, cost: cost, nextHop: routerId};
  }

  removeInterface() {
    this.interface = null;
  }

  sendPacket(toPCId) {
    if (this.interface == null) {
      alert('This computer is not connected to any router');
      return null;
    }
    const nodes = [];
    nodes.push(this.id);
    let currentRouter = this.routingService.routers.find( r => r.id === this.interface.destination);
    while (currentRouter.routingTable.find( r => r.destination === toPCId) != null) {
      const nextRouterEntry = currentRouter.routingTable.find( r => r.destination === toPCId);
      if (nextRouterEntry == null) {
        break;
      }
      nodes.push(currentRouter.id);
      if (nextRouterEntry.destination === nextRouterEntry.nextHop) {
        nodes.push(toPCId);
        return nodes;
      }

      if (nodes.length > 16) {
        alert('Too many hops (>15). Route unreachable.');
        return null;
      }

      currentRouter = this.routingService.routers.find(r => r.id === nextRouterEntry.nextHop);
    }

    alert('Computer ' + toPCId + ' is unreachable from ' + this.id);
    return null;
  }
}
