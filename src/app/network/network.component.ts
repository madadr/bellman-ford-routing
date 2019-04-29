import {Component, OnInit} from '@angular/core';
import {Network, DataSet} from 'vis';
import {log} from 'util';

interface RoutingTableItem {
  item: string;
  cost: number;
  nextHop: string;
}

const ROUTINGITEMS: RoutingTableItem[] = [
  {
    item: 'R1',
    cost: 5,
    nextHop: 'R2'
  },
  {
    item: 'R2',
    cost: 2,
    nextHop: 'PC2'
  },
  {
    item: 'PC1',
    cost: 2,
    nextHop: 'R1'
  }
];

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})

export class NetworkComponent implements OnInit {
  private network: any;
  private nodes: any;
  private edges: any;
  private lastNodeId = new Map(); // key: node type (router, PC); value: recent assigned ID
  private lastEdgeId = 1;
  routingItems = ROUTINGITEMS;

  ngOnInit() {
    this.nodes = new DataSet();
    this.edges = new DataSet();
    const data = {nodes: this.nodes, edges: this.edges};
    const options = {
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

    const container = document.getElementById('visualisation');
    this.network = new Network(container, data, options);
  }

  onAddNode(type) {
    // log('n ' + JSON.stringify(this.nodes));
    try {
      const id = this.lastNodeId.has(type) ? this.lastNodeId.get(type) + 1 : 1;

      this.nodes.add({
        id: type + id,
        label: type + id,
        group: type
      });

      const table = document.getElementsByClassName('tablesContainer')[0];
      table.innerHTML += `<table style="width:300px; margin: 5px;" class="table table-striped">
         <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Cost</th>
            <th scope="col">Next hop</th>
          </tr>
          </thead>
          <tbody>

          <tr>
            <td>${this.routingItems[0].item}</td>
            <td>${this.routingItems[0].cost}</td>
            <td>${this.routingItems[0].nextHop}</td>
          </tr>

          </tbody>
        </table>`;

      this.lastNodeId.set(type, id);
    } catch (err) {
      alert(err);
    }
  }

  onAddEdge() {
    const chosen = this.network.getSelectedNodes();
    log('chosen ' + JSON.stringify(chosen));

    if (chosen == null || chosen.length < 2) {
      alert('Select 2 items to create connection');
      return;
    } else if (chosen.length > 2) {
      alert('Too many items selected');
      return;
    }

    try {
      const id = this.lastEdgeId;
      const from = chosen[0];
      const to = chosen[1];

      if (from != null && to != null
        && !(from.startsWith('PC') && to.startsWith('PC'))) {
        this.edges.add({
          id: id,
          from: from.toUpperCase(),
          to: to.toUpperCase(),
          color: {
            color: '#0000ff'
          }
        });
      } else {
        alert('Cannot create connection between 2 PCs');
      }
      this.lastEdgeId++;
    } catch (err) {
      alert(err);
    }
  }

  onRemoveNode() {
    const chosen = this.network.getSelectedNodes();
    this.nodes.remove(chosen);
  }

  onRemoveEdge() {
    const chosen = this.network.getSelectedEdges();
    this.edges.remove(chosen);
  }
}
