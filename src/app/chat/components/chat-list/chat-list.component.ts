import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllChatsQuery } from '../../services/chat.graphql';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { MatDialog } from '@angular/material';
import { ChatAddGroupComponent } from '../chat-add-group/chat-add-group.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent extends BaseComponent<Chat> implements OnInit {

  chats$: Observable<Chat[]>;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.chats$ = this.chatService.chats$;
  }

  getChatTitle(chat: Chat): string {
    return chat.title || chat.users[0].name;
  }

  getLastMessage(chat: Chat): string {
    const message = chat.messages[0];
    if (message) {
      const sender =
      (message.sender.id === this.authService.authUser.id)
        ? 'Você'
        : message.sender.name;
      return `${sender}: ${message.text}`;
    }
    return 'Sem Messagens.';
  }

  onAddGroup(): void {
    this.dialog.open(ChatAddGroupComponent, { width: '400px', height: '80vh', });
  }

  getChatImage(chat: Chat): string {
    return !chat.isGroup ? 'assets/images/user-no-photo.png' : 'assets/images/group-no-photo.png';
  }
}
