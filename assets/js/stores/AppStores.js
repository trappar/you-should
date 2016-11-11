import DecisionStore from './DecisionStore';
import UserStore from './UserStore';
import AlertStore from './AlertStore';
import PostStore from './PostStore';

export default class AppStores {
  alerts;
  decisions;
  user;

  constructor(appState) {
    this.alerts = new AlertStore();
    this.decisions = new DecisionStore(this);
    this.user = new UserStore();
    this.posts = new PostStore();

    for (const key in appState) {
      if (appState.hasOwnProperty(key) && this.hasOwnProperty(key)) {
        const state = appState[key];

        if (state) {
          this[key].update(appState[key]);
        }
      }
    }
  }
}
