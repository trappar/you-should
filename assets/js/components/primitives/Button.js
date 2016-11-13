import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Button(props) {
  let { extraClasses, ...filteredProps } = props;
  filteredProps.className = classNames('btn', extraClasses);

  return <button {...filteredProps}>{props.children}</button>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  extraClasses: PropTypes.any
};
