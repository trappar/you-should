import React from 'react';
import DocumentTitle from 'react-document-title';
import { observer } from 'mobx-react';

@observer(['posts'])
export default class NewsPage extends React.Component {
  render() {
    return (
      <div className="container">
        <DocumentTitle title="News | You Should"/>
        <h1>News</h1>
        <hr/>

        {this.props.posts.all().map(post => (
          <div key={post.id}>
            <h3>{post.subject}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}
