import React, { PropTypes } from 'react';

const handleClick = (onClick) => (event) => {
  event.preventDefault();
  if (onClick) {
    return onClick();
  }
};

export default function LinkButton(props) {
  const { onClick, ...restProps } = props;
  return (
    <a href="#" onClick={handleClick(onClick)} {...restProps}>
      {props.children}
    </a>
  )
}

LinkButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any.isRequired
};