import { observable, computed } from 'mobx';


export default class UserStore {
  @observable username;
  @observable decisionCount;

  update(user) {
    this.username = user.username;
    this.decisionCount = user.decisionCount;
  }

  logout() {
    this.username = null;
  }

  @computed get loggedIn() {
    return this.username;
  }
}
