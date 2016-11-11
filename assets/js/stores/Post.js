import {observable} from 'mobx';

export default class Post{
  id;
  @observable subject;
  @observable body;

  constructor(post) {
    Object.assign(this, post);
  }
}
