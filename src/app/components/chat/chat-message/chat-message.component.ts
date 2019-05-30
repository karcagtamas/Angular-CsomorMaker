import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat.model';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  user: User = new User('');
  imageUrl = '../../assets/images/profile.png';

  constructor(private userservice: UserService) {}

  ngOnInit() {
    this.userservice.getUser(this.chatMessage.sender).then(res => {
      this.user = res;
      this.userservice.getImage(this.user.imageName).then(res2 => {
        this.imageUrl = res2;
      });
    });
  }
}
