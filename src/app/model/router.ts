import {RoutingEntry} from './routing-entry';

export class Router {
  interfaces: RoutingEntry[] = [];
  routingTable: RoutingEntry[] = [];

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

    this.clearAndRestoreRoutingTable(routerId);
  }

  updateRoutingTable(source, routingEntries: RoutingEntry[]) {
    this.clearAndRestoreRoutingTable(source);
    const interfaceCost = this.interfaces.find(e => e.destination === source && e.nextHop === source).cost;

    for (const entry of routingEntries) {
      entry.nextHop = source;
      const oldEntry = this.routingTable.find(e => e.destination === entry.destination);
      if (oldEntry == null) {
        this.routingTable.push(entry);
      } else if (oldEntry.cost > interfaceCost + entry.cost) {
        this.routingTable[this.routingTable.indexOf(oldEntry)] = entry;
      }
    }
  }

  sendUpdates() {
    // foreach interface router - take from RoutingService
    // updateRoutingTable(this.routingTable)
  }

  private clearAndRestoreRoutingTable(routerId) {
    const routingEntries = this.routingTable.filter(e => e.nextHop === routerId);

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
