import React from 'react';
import classNames from 'classnames';

export default function Input(props) {
  return (
    <div className={classNames('form-group', { 'has-danger': props.errors }, { 'has-success': props.valid })}>
      <input
        type={props.type}
        className={classNames('form-control', 'form-control-lg', { 'form-control-danger': props.errors }, { 'form-control-success': props.valid })}
        name={props.name}
        id={props.name}
        value={props.value}
        placeholder={props.label}
        onChange={props.onChange}
      />
      {props.errors && (
        <div className="form-control-feedback">
          {props.errors.map((error, i) => (
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
