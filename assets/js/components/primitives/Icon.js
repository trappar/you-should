import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Icon(props) {
  return (
    <i className={classNames('fa', 'fa-' + props.type)} aria-hidden="true"/>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired
};