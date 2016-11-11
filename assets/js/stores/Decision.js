import Entity from './Entity';
import {computed, action} from 'mobx';
import uuid from 'uuid';
import Choice from './Choice';
import AlertStore from './AlertStore';
import deepMerge from 'deepmerge';

export default class Decision extends Entity {
  getStructure() {
    return {
      tracked: {
        question: '',
        theme: 'indigo',
        choices: [],
      },
      observed: {
        UI: {
          configuring: false,
          answering: false,
          deleteConfirmation: false,
          loading: false,
          filter: '',
        }
      },
      unobserved: {
        id: uuid.v4(),
        unacceptedChanges: null,
        alerts: new AlertStore(),
      }
    }
  }

  update(domain) {
    if (domain) {
      if (domain.choices) {
        domain.choices = domain.choices.map(choice => new Choice(choice));
      }
      if (domain.answer) {
        domain.answer = new Choice(domain.answer);
      }
    }
    super.update(domain);
    if (this.added) {
      this.UI.configuring = true;
    }
  }

  @computed get filteredChoices() {
    return this.choices.filter(choice =>
      choice.name.toLowerCase().includes(this.UI.filter.toLowerCase())
    );
  }

  @action edit() {
    this.UI.configuring = true;
    this.UI.answering = false;
  }

  @action save() {
    this.UI.configuring = false;

    if (!this.unacceptedChanges) {
      this.unacceptedChanges = this.acceptChanges();
    } else {
      const newChanges = this.acceptChanges();
      if (newChanges) {
        this.unacceptedChanges = deepMerge(this.unacceptedChanges, newChanges, {
          arrayMerge: (dest, source) => dest.concat(source)
        });
      }
    }

    if (this.unacceptedChanges) {
      this.UI.loading = true;
      fetch('/decision/update.json', {
        method: 'POST',
        body: JSON.stringify(this.unacceptedChanges),
        credentials: 'include'
      })
        .then((response) => response.json())
        .then(action('save-results', json => {
          this.unacceptedChanges = null;
          this.UI.loading = false;
          this.setFilter();
          this.update(json);
          this.alerts.clearErrors();
        }))
        .catch(e => {
          this.UI.loading = false;
          this.UI.configuring = true;
          this.alerts.setError('Error communicating with server. Try saving again.')
        });
    }
  }

  @action cancel() {
    this.UI.configuring = false;
    this.declineChanges();
    this.setFilter();

    // Return true if this was added and nothing has been committed - we can discard the decision
    return this.added
  }

  @action setFilter(filter = '') {
    this.UI.filter = filter;
  }

  @action setTheme(theme) {
    this.theme = theme;
  }

  @action setQuestion(question) {
    this.question = question;
  }

  @action setAnswer(answer) {
    this.answer = new Choice(answer);
  }

  @action setChoices(choices) {
    this.choices = [];
    choices.forEach(choice => this.addChoice(choice));
  }

  @action addChoice(choice) {
    this.choices.push(new Choice(choice))
  }

  @action removeChoice(choice) {
    this.choices.remove(choice);
  }
}
