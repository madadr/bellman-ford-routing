import {Injectable} from '@angular/core';
import {DataSet} from 'vis';

@Injectable({
  providedIn: 'root'
})
export class NetworkManagerService {
  readonly options: any;

  nodes: any;
  edges: any;
  network: any;

  private lastNodeId = new Map(); // key: node type (e.g. R(router), PC); value: recent assigned ID

  constructor() {
    this.options = {
      groups: {
        'R': {
          color: 'yellow'
        },
        'PC': {}
      },
      interaction: {
        multiselect: true
      }
    };

    this.nodes = new DataSet();
    this.edges = new DataSet();
  }

  init(network) {
    this.network = network;
  }

  addNode() {
    const type = 'R';
    try {
      const id = this.lastNodeId.has(type) ? this.lastNodeId.get(type) + 1 : 1;

      this.nodes.add({
        id: type + id,
        label: type + id,
        group: type
      });

      this.lastNodeId.set(type, id);

      return type + id;
    } catch (err) {
      alert(err);
    }
  }

  addEdge(fromId, toId, cost) {
    try {
      const edgeId = fromId + toId;

      if (fromId != null && toId != null) {
        this.edges.add({
          id: edgeId,
          from: fromId.toUpperCase(),
          to: toId.toUpperCase(),
          label: String(cost),
          color: {
            color: '#0000ff'
          }
        });
      }
    } catch (err) {
      alert(err);
    }
  }

  removeNode(id) {
    this.nodes.remove(id);
  }

  removeEdge(id) {
    this.edges.remove(id);
  }

  hasEdge(nodeId1, nodeId2) {
    return this.edges.get({
      filter: (edge => edge.id === nodeId1 + nodeId2 || edge.id === nodeId2 + nodeId1)
    }).length > 0;
  }
}
