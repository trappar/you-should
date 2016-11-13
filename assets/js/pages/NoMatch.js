import React from 'react';
import DocumentTitle from 'react-document-title';

export default function NoMatch() {
  return (
    <div className="container">
      <DocumentTitle title="Not Found | You Should"/>
      <h1>The page you requested does not exist!</h1>
    </div>
  );
}
