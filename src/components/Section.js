export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.title = this._profileTitle.textContent;
    userCurrentInfo.description = this._profileDescription.textContent;
    return userCurrentInfo;
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }
}
