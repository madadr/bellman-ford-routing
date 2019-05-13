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
          shape: 'box',
          color: {
            background: 'yellow',
            border: 'black',
            highlight: {
              background: '#d400ce'
            }
          }
        },
        'PC': {
          shape: 'circle',
          color: {
            background: 'green',
            border: 'black',
            highlight: {
              background: '#d400ce'
            }
          },
          font: {
            color: 'white'
          }
        }
      },
      edges: {
        font: {
          background: 'white',
          size: 16
        },
        color: {
          background: 'blue',
          highlight: '#d400ce'
        },
        width: 2
      },
      interaction: {
        navigationButtons: true,
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

  addComputerNode() {
    const type = 'PC';
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

  highlightPath(nodes: any[]) {
    for (let i = 0; i < nodes.length - 1; ++i) {
      if (this.hasEdge(nodes[i], nodes[i + 1])) {
        const edgeId = this.edges.getIds().find(id => id === nodes[i] + nodes[i + 1] || id === nodes[i + 1] + nodes[i]);
        const edge = this.edges.get(edgeId);
        edge.color = {color: 'red'};
        this.edges.update(edge);
      }
    }
  }

  clearHighlights() {
    for (const id of this.edges.getIds()) {
      const edge = this.edges.get(id);
      edge.color = {color: 'blue'};
      this.edges.update(edge);
    }
  }
}
