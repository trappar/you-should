import React from 'react';
import classNames from 'classnames';

export default function Input(props) {
  const {errors, valid, label, ...restProps} = props;

  return (
    <div className={classNames('form-group', { 'has-danger': errors }, { 'has-success': valid })}>
      <input
        className={classNames('form-control', 'form-control-lg', { 'form-control-danger': errors }, { 'form-control-success': valid })}
        id={props.name}
        placeholder={label}
        onChange={props.onChange}
        {...restProps}
      />
      {errors && (
        <div className="form-control-feedback">
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}
    </div>
  )
}
Input.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  valid: React.PropTypes.bool,
  errors: React.PropTypes.array,
};
