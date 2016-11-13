import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Swatch(props) {
  const { theme, ...restProps } = props;

  let classes = classNames(
    'swatch',
    theme,
    { clickable: props.onClick }
  );

  return (
    <div className={classes} {...restProps} tabIndex="-1"/>
  );
}
Swatch.propTypes = {
  theme: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
