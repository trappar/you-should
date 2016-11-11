import {observable} from 'mobx';
import Post from './Post';

export default class PostStore {
  @observable posts = [];

  update(posts) {
    this.posts = [];
    posts.forEach(post => this.posts.push(new Post(post)));
  }

  all() {
    return this.posts;
  }
}