import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Network} from 'vis';
import {NetworkManagerService} from '../../services/network-manager.service';
import {RoutingService} from '../../services/routing.service';

@Component({
  selector: 'app-network',
  templateUrl: './network-controller.component.html',
  styleUrls: ['./network-controller.component.scss']
})
export class NetworkControllerComponent implements OnInit, AfterViewInit {
  constructor(private networkManager: NetworkManagerService, private routingService: RoutingService) {
  }

  ngOnInit() {
    const data = {nodes: this.networkManager.nodes, edges: this.networkManager.edges};
    const container = document.getElementById('visualisation');
    this.networkManager.init(new Network(container, data, this.networkManager.options));
  }

  onAddRouter() {
    const nodeId = this.networkManager.addNode();
    if (nodeId != null) {
      this.routingService.addRouter(nodeId);
    }
  }

  onAddComputer() {
    const nodeId = this.networkManager.addComputerNode();
    if (nodeId != null) {
      this.routingService.addComputer(nodeId);
    }
  }

  onAddLink() {
    const chosen = this.networkManager.network.getSelectedNodes();

    if (chosen == null || chosen.length < 2) {
      alert('Select 2 items to create connection');
      return;
    } else if (chosen.length > 2) {
      alert('Too many items selected');
      return;
    } else if (chosen[0].startsWith('PC') && chosen[1].startsWith('PC')) {
      alert('Cant add connection between 2 computers');
      return;
    }

    const costString: string = (document.getElementById('cost') as HTMLInputElement).value;
    // tslint:disable-next-line:radix
    const cost = parseInt(costString);
    if (cost == null || cost < 1 || costString === '') {
      alert('Cost must be positive number!');
      return;
    }

    if (this.networkManager.hasEdge(chosen[0], chosen[1])) {
      alert('Link already exists');
      return;
    }

    this.routingService.addInterface(chosen[0], chosen[1], cost);
    this.routingService.addInterface(chosen[1], chosen[0], cost);

    this.networkManager.addEdge(chosen[0], chosen[1], cost);
  }

  onSendPackage() {
    const chosen = this.networkManager.network.getSelectedNodes();

    if (chosen == null || chosen.length < 2 || !chosen[0].startsWith('PC') || !chosen[1].startsWith('PC')) {
      alert('Select 2 computers to send package');
      return;
    } else if (chosen.length > 2) {
      alert('Too many items selected');
      return;
    }
    const firstComputer = this.routingService.computers.find( r => r.id === chosen[0]);
    const nodes = firstComputer.sendPackage(chosen[1]);
    alert(JSON.stringify(nodes));
  }

  onRemoveNodes() {
    const ids = this.networkManager.network.getSelectedNodes();
    for (const id of ids) {
      if (id.startsWith('PC')) {
        this.routingService.removeComputer(id);
      }
      this.routingService.removeRouter(id);
      this.networkManager.removeNode(id);
    }
  }

  onRemoveLinks() {
    const ids = this.networkManager.network.getSelectedEdges();
    for (const id of ids) {
      const edge = this.networkManager.edges.get(id);

      this.routingService.removeInterface(edge.from, edge.to);
      this.routingService.removeInterface(edge.to, edge.from);

      this.networkManager.removeEdge(id);
    }
  }

  ngAfterViewInit(): void {
    // Generates network-controller structure. Test purposes only!
    // const routers = 6;
    // for (let id = 1; id <= routers; ++id) {
    //   this.onAddRouter();
    // }
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R1', 'R2']);
    // this.onAddLink();
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R1', 'R3']);
    // this.onAddLink();
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R3', 'R5']);
    // this.onAddLink();
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R5', 'R1']);
    // this.onAddLink();
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R4', 'R5']);
    // this.onAddLink();
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R4', 'R2']);
    // this.onAddLink();
    // this.networkManager.network.unselectAll();
    // this.networkManager.network.selectNodes(['R4', 'R6']);
    // this.onAddLink();
  }

  onSelectAll() {
    this.networkManager.network.selectNodes(this.networkManager.nodes.map(n => n.id));
  }

  onUnselectAll() {
    this.networkManager.network.unselectAll();
  }

  onSendUpdates() {
    const ids = this.networkManager.network.getSelectedNodes();
    if (ids.length < 1 || ids.length > 1) {
      alert('Select single router to send updates!');
      return;
    }

    this.routingService.sendUpdates(ids[0]);
  }
}
