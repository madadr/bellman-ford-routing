import {Injectable} from '@angular/core';
import {DataSet} from 'vis';
import {Router} from '../model/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkManagerService {
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  readonly options: any;

  nodes: any;
  edges: any;
  network: any;
  routers: Router[] = [];

  private lastNodeId = new Map(); // key: node type (e.g. R(router), PC); value: recent assigned ID
  private lastEdgeId = 1;

  private _isInitialized = false;

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
    this._isInitialized = true;
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
    } catch (err) {
      alert(err);
    }
  }

  addEdge(fromId, toId, cost) {
    try {
      const edgeId = this.lastEdgeId;

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
      this.lastEdgeId++;
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
}
