export default class UserInfo {
  constructor({ profileTitle, profileDescription, avatarSelector }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileDescription = document.querySelector(profileDescription);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.title = this._profileTitle.textContent;
    userCurrentInfo.description = this._profileDescription.textContent;
    userCurrentInfo.avatar = this._avatar.src;
    return userCurrentInfo;
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
