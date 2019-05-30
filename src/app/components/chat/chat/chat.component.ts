import { ChatMessage } from './../../../models/chat.model';
import { ChatService } from './../../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatMessages: ChatMessage[] = [];
  thisEmail = localStorage.getItem('user');
  text = '';

  constructor(private chatservice: ChatService) {}

  ngOnInit() {
    this.chatservice.getMessages().subscribe(data => {
      this.chatMessages = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as ChatMessage;
      });
    });
  }

  sendMessage() {
    if (this.text) {
      const message = new ChatMessage();
      message.message = this.text;
      message.sender = this.thisEmail;
      message.date = new Date();
      this.chatservice.sendMessage(message).then(() => {
        this.text = '';
      });
    }
  }
}
