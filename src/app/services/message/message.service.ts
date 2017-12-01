import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { IMessage } from './../../models/message';

@Injectable()
export class MessageService {

  private _messages: IMessage[] = [];
  messagesUpdated: Subject<IMessage[]> = new Subject<IMessage[]>();
  private _dialogEnded: boolean = false;

  constructor() { }

  getMessages() {
    return this._messages;
  }

  addMessage(message: IMessage) {
    this._messages.push(message);
    this.messagesUpdated.next(this._messages);
  }

  setDialogEndStatus(dialogEnded) {
    this._dialogEnded = dialogEnded;
  }

  getDialogEndStatus() {
    return this._dialogEnded;
  }

}
