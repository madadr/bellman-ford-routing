import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Network, DataSet} from 'vis';

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

  ngOnInit() {
    this.nodes = new DataSet();
    this.edges = new DataSet();
    const data = {nodes: this.nodes, edges: this.edges};
    const options = {};

    const container = document.getElementById('visualisation');
    this.network = new Network(container, data, options);
  }

  onAddNode(type) {
    try {
      const id = this.lastNodeId.has(type) ? this.lastNodeId.get(type) + 1 : 1;

      this.nodes.add({
        id: type + id,
        label: type + id
      });

      this.lastNodeId.set(type, id);
    } catch (err) {
        alert(err);
      }
    }
  }
