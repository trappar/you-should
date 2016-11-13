import {observable, action, computed} from 'mobx';
import Decision from './Decision';

export default class DecisionStore {
  @observable decisions;
  @observable needsUpdate;

  /**
   * @param stores {AppStores}
   */
  constructor(stores) {
    this.decisions = [];
    this.needsUpdate = true;
    this.loading = false;
    this.stores = stores;
    this.alerts = this.stores.alerts.getChild('decision-store');
  }

  fetchIfNeeded() {
    if (this.needsUpdate && this.stores.user.decisionCount > 0) {
      this.fetchFromServer();
    }
  }

  @action fetchFromServer() {
    this.loading = true;
    fetch(`/decisions.json`, {
      credentials: 'include'
    })
      .then(response => {
        this.loading = false;
        return response.json();
      })
      .then(json => {
        this.update(json);
      })
      .catch(e => {
        this.alerts.setError(`Unable to get your decisions from the server.`);
      });
  }

  update(decisions) {
    this.set(decisions);
    this.needsUpdate = false;
  }

  all() {
    return this.decisions;
  }

  logout() {
    this.set([]);
    this.needsUpdate = true;
  }

  @computed get anyConfiguring() {
    return this.decisions.filter(decision => decision.UI.configuring).length > 0;
  }

  @action set(decisions) {
    this.decisions = [];
    decisions.forEach(decision => this.add(decision));
  }

  @action add(decision) {
    this.decisions.push(new Decision(decision, this.alerts.getChild()))
  }

  @action remove(decision) {
    const index = this.decisions.indexOf(decision);
    this.decisions.remove(decision);

    if (!decision.added) {
      fetch(`/decision/${decision.id}.json`, {
        method: 'DELETE',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then(action('save-results', json => {
          this.alerts.clearErrors();
          console.log(json);
        }))
        .catch(e => {
          decision.UI.deleteConfirmation = false;
          this.decisions.splice(index, 0, decision);
          this.alerts.setError(`Removing the Decision titled "${decision.question}". Please try again.`);
        });
    }
  }
}
