import { Injectable } from '@angular/core';

import { UserInfo } from '../../models/user-info';

@Injectable()
export class UserInfoService {

  private userInfo: UserInfo;

  constructor() { }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }

  getUserInfo() {
    return this.userInfo;
  }

}
