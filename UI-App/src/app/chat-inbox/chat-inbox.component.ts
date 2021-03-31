import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';



const SOCKET_ENDPOINT = 'localhost:3000/chat';
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
 
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
  
}


