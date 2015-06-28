import _ from 'lodash';
import React, {PropTypes} from 'react';
import Router, {Link} from 'react-router';

export default React.createClass({
  mixins: [Router.State],
  propTypes: {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
  },
  render: function() {
    let props = _.omit(this.props, 'children');
    let className = this.isActive(this.props.to) ? 'active' : '';

    return (
      <li className={className}>
        <Link {...props}>{this.props.children}</Link>
      </li>
    );
  }
});
