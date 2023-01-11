import { Injectable, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { OnDestroy } from '@angular/core';

export interface onMessage {
  receive: (data: any) => void;
}
@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  socket: WebSocket;
  listeners: any[] = [];
  constructor() {
    this.socket = new WebSocket('ws://localhost:5002');
  }

  /**
   * starts listening to new product updates
   * @param callback a function to be called upon socket creation
   */
  listen(callback: onMessage) {
    const listener = callback.receive;
    this.socket.addEventListener('message', listener);

    this.listeners.push(listener);
  }

  /**
   * stops listening to new product updates
   */
  stopListening() {
    for (let l of this.listeners) {
      this.socket.removeEventListener('message', l);
    }
  }
  ngOnDestroy(): void {
    this.socket.close();
  }
}
