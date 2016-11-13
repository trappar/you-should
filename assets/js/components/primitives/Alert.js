import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * @returns Object|false
 */
export default function Alert({ children, type, onDismiss }) {
  if (Array.isArray(children)) {
    children = children.length ? children.map((child, i) => <div key={i}>{child}</div>) : null;
  }

  if (children) {
    return (
      <div className={classNames('alert', 'alert-' + type, { 'alert-dismissible': onDismiss })}>
        {
          onDismiss &&
          <button type="button" className="close" onClick={onDismiss}>
            <span>&times;</span>
          </button>
        }
        {children}
      </div>
    );
  }

  return false;
}
Alert.propTypes = {
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func
};
