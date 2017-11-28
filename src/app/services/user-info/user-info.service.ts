import { Injectable } from '@angular/core';

import { IUserInfo } from '../../models/user-info';

@Injectable()
export class UserInfoService {

  private _userInfo: IUserInfo;

  constructor() { }

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
  }

  getUserInfo() {
    return this._userInfo;
  }

}
