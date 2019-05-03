import {Injectable} from '@angular/core';
import {Router} from '../model/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private routers: Router[] = [];

  addRouter(id) {
    this.routers.push(new Router(id));
  }

  removeRouter(id) {
    const routerIndex = this.routers.findIndex(r => r.id === id);
    if (routerIndex !== -1) {
      this.routers.splice(routerIndex, 1);
    }
  }

  getRouter(id) {
    return this.routers.find(r => r.id === id);
  }
}
