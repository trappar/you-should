import React from 'react';
import DocumentTitle from 'react-document-title';
import StandardAlerts from '../components/primitives/StandardAlerts';
import { observer } from 'mobx-react';

@observer(['posts', 'alerts'])
export default class NewsPage extends React.Component {
  render() {
    return (
      <div className="container">
        <DocumentTitle title="News | You Should"/>
        <h1>News</h1>
        <StandardAlerts alerts={this.props.alerts}/>
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
