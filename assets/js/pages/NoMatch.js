import React from 'react';
import DocumentTitle from 'react-document-title';

export default function NoMatch(props) {
  return (
    <div className="container">
      <DocumentTitle title="Not Found | You Should"/>
      <h1>There is no {props.location} page!</h1>
    </div>
  );
}