import { Component, Input, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

import {
  animate, state, style, transition, trigger
} from '@angular/animations';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0.0,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class FooterComponent implements OnInit {
  isOpen = false;

  closeResult = '';

  private SOCKET_ENDPOINT = 'localhost:3001';
  
  private socket: any;
  name: string = '';
  message: string = '';
  messageList: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection();

  }


  setupSocketConnection() {
    this.socket = io((this.SOCKET_ENDPOINT));
    this.socket.on('message-broadcast', (msg: string) => {
    if (msg) {
     this.messageList.push(msg);
     }
   });
 }

  SendMessage() {
    this.socket.emit('message',`${this.name}: ${this.message}`);
    // this.messageList.push(`${this.message}`);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
