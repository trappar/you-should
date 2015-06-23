import React, {PropTypes} from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.any
  },
  render: function() {
    let props = _.omit(this.props, 'extraClasses');
    props.className = classNames(
      'btn',
      this.props.extraClasses
    );

    return <button {...props}>{this.props.children}</button>;
  }
});
