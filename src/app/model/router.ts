import {RoutingEntry} from './routing-entry';

export class Router {
  public interfaces: RoutingEntry[] = [];
  public routingTable: RoutingEntry[] = [];

  constructor(public readonly id: string) {
    this.routingTable.push({destination: id, cost: 0, nextHop: null});
  }

  addInterface(routerId, cost) {
    const newEntry = {destination: routerId, cost: cost, nextHop: routerId};
    this.interfaces.push(newEntry);

    const entry = this.routingTable.find(e => e.destination === routerId);
    if (entry == null) {
      this.routingTable.push(newEntry);
    } else if (entry.cost >= cost) { // prefer direct connection over indirect
      this.routingTable[this.routingTable.indexOf(entry)] = newEntry;
    }
  }

  removeInterface(routerId) {
    const interfaceIndex = this.interfaces.findIndex(e => e.destination === routerId);
    if (interfaceIndex === -1) {
      return;
    }
    this.interfaces.splice(interfaceIndex, 1);

    this.clearEntries(routerId);
  }

  updateRoutingTable(source, updateEntries: RoutingEntry[]) {
    this.clearEntries(source);
    const interfaceCost = this.interfaces.find(e => e.destination === source).cost;

    for (const entry of updateEntries) {
      if (entry.destination === this.id) {
        continue;
      }

      const newEntry = {
        destination: entry.destination,
        cost: entry.cost + interfaceCost,
        nextHop: source
      };
      const oldEntry = this.routingTable.find(e => e.destination === entry.destination);

      if (oldEntry == null) {
        this.routingTable.push(newEntry);
      } else if (newEntry.cost < oldEntry.cost) {
        this.routingTable[this.routingTable.indexOf(oldEntry)] = newEntry;
      }
    }
  }

  private clearEntries(nextHopId) {
    const routingEntries = this.routingTable.filter(e => e.nextHop === nextHopId);

    for (const entry of routingEntries) {
      // Remove entry
      this.routingTable.splice(this.routingTable.indexOf(entry), 1);
      // Try to restore entry from interface
      const interfaceEntry = this.interfaces.find(e => e.destination === entry.destination);
      if (interfaceEntry != null) {
        this.routingTable.push(interfaceEntry);
      }
    }
  }
}
