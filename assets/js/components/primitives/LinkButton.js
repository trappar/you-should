import React from 'react';

export default function LinkButton(props) {
  const {onClick, ...restProps} = props;
  return (
    <a href="#" onClick={(e) => {
      e.preventDefault();
      if (onClick) {
        return onClick();
      }
    }} {...restProps}>
      {props.children}
    </a>
  )
}

LinkButton.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.any.isRequired
};