import Entity from './Entity';
import {action} from 'mobx';
import uuid from 'uuid';

export default class Choice extends Entity {
  getStructure() {
    return {
      tracked: {
        name: '',
        priority: 10,
      },
      unobserved: {
        id: uuid.v4()
      }
    }
  }

  @action setPriority(priority) {
    this.priority = priority;
  }

  @action setName(name) {
    this.name = name;
  }
}
