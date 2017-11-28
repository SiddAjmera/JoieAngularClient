import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { IMessage } from './../../models/message';

@Injectable()
export class MessageService {

  _messages: IMessage[] = [];
  messagesUpdated: Subject<IMessage[]> = new Subject<IMessage[]>();

  constructor() { }

  getMessages() {
    return this._messages;
  }

  addMessage(message: IMessage) {
    this._messages.push(message);
    this.messagesUpdated.next(this._messages);
  }

}
