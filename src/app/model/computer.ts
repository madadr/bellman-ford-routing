import {RoutingEntry} from './routing-entry';
import {NetworkManagerService} from '../services/network-manager.service';
import {RoutingService} from '../services/routing.service';

export class Computer {
  public interface: RoutingEntry;

  constructor(public readonly id: string,  private routingService: RoutingService) {
  }

  addInterface(routerId, cost) {
    const newEntry = {destination: routerId, cost: cost, nextHop: routerId};
    this.interface = newEntry;
  }

  sendPackage(toPCId) {
    if (this.interface == null) {
      alert('This computer is not connected to any other computer');
      return null;
    }
    const destinationRouter = this.routingService.routers.find( r => r.id === this.interface.destination);
    if (destinationRouter == null) {
      alert('This computer is not connected to any other computer');
      return null;
    }
    const nodes = [this.id];
    var currentRouter = destinationRouter;
    while (currentRouter.routingTable.find( r => r.nextHop === toPCId) != null) {
      const nextRouterEntry = currentRouter.routingTable.find( r => r.destination === toPCId);
      if (nextRouterEntry == null) {
        alert('This computer ' + toPCId + ' is not reachable');
        return null;
      }
      nodes.push(currentRouter.id);
      if (nextRouterEntry.destination === nextRouterEntry.nextHop) {
        nodes.push(toPCId);
        break;
      }

      const nextRouter = this.routingService.routers.find( r => r.id === nextRouterEntry.nextHop);
      currentRouter = nextRouter;
    }

    if(nodes.length === 1) {
      return null;
    }

    return nodes;
  }
}
