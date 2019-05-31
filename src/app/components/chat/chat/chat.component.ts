import { UserService } from 'src/app/services/user.service';
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
  isAdmin = false;
  text = '';

  constructor(private chatservice: ChatService, private userservice: UserService) {}

  ngOnInit() {
    this.chatservice.getMessages().subscribe(data => {
      this.chatMessages = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as ChatMessage;
      });
      this.chatMessages.sort();

      this.chatMessages.sort((obj1, obj2) => {
        if (obj1.date > obj2.date) {
          return 1;
        }
        if (obj1.date < obj2.date) {
          return -1;
        }
        return 0;
      });

      setTimeout(() => {
        const element = document.getElementById(this.chatMessages[this.chatMessages.length - 1].id.toString());
        element.scrollIntoView();
      }, 500);

      this.userservice.isAdmin().then(res => {
        this.isAdmin = res;
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

  deleteMessage(event) {
    this.chatservice.deleteMessage(event.id);
  }
}
