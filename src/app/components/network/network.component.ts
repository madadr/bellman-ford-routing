import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Network} from 'vis';
import {NetworkManagerService} from '../../services/network-manager.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit, AfterViewInit {
  constructor(private networkManager: NetworkManagerService) {
  }

  ngOnInit() {
    const data = {nodes: this.networkManager.nodes, edges: this.networkManager.edges};
    const container = document.getElementById('visualisation');
    this.networkManager.init(new Network(container, data, this.networkManager.options));
  }

  onAddRouter() {
    this.networkManager.addNode();
  }

  onAddLink() {
    const chosen = this.networkManager.network.getSelectedNodes();

    if (chosen == null || chosen.length < 2) {
      alert('Select 2 items to create connection');
      return;
    } else if (chosen.length > 2) {
      alert('Too many items selected');
      return;
    }

    // TODO: read from input field
    const cost = 3;
    if (cost == null || cost < 1) {
      alert('Cost must be positive number!');
    }

    this.networkManager.addEdge(chosen[0], chosen[1], cost);
  }

  onRemoveRouter() {
    const ids = this.networkManager.network.getSelectedNodes();
    for (const id of ids) {
      this.networkManager.removeNode(id);
    }
  }

  onRemoveEdge() {
    const ids = this.networkManager.network.getSelectedEdges();
    for (const id of ids) {
      this.networkManager.removeEdge(id);
    }
  }

  ngAfterViewInit(): void {
    // Generates network structure. Test purposes only!
    const routers = 6;
    for (let id = 1; id <= routers; ++id) {
      this.onAddRouter();
    }
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R1', 'R2']);
    this.onAddLink();
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R1', 'R3']);
    this.onAddLink();
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R3', 'R5']);
    this.onAddLink();
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R5', 'R1']);
    this.onAddLink();
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R4', 'R5']);
    this.onAddLink();
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R4', 'R2']);
    this.onAddLink();
    this.networkManager.network.unselectAll();
    this.networkManager.network.selectNodes(['R4', 'R6']);
    this.onAddLink();
  }
}
