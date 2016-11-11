import React from 'react';
import classNames from 'classnames';
import {observer} from 'mobx-react';

export default observer(ValidatedInput);

function ValidatedInput({ name, label, type = 'text', input}) {
  const valid = input.validating && input.errors.length === 0;

  let errors = false;
  if (input.validating && input.errors.length) {
    errors = (
      <div className="form-control-feedback">
        {input.errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={classNames('form-group', { 'has-danger': errors }, { 'has-success': valid })}>
      <input
        type={type}
        className={classNames('form-control', 'form-control-lg', { 'form-control-danger': errors }, { 'form-control-success': valid })}
        name={name}
        id={name}
        value={input.value}
        placeholder={label}
        onChange={(e) =>input.setValue(e.target.value)}/>
      {errors}
    </div>
  )
}
ValidatedInput.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  input: React.PropTypes.object.isRequired,
};
