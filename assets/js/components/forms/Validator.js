import React from 'react';
import classNames from 'classnames';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import PropsProvider from 'props-provider';
import isEmail from 'validator/lib/isEmail';

@observer
export default class Validator extends React.Component {
  @observable value = '';
  @observable validating;
  @observable shaking = false;

  constructor(props) {
    super(props);

    this.shakeTimeout = null;
    this.validating = false;
    this.validators = props.validators;
    if (props.refStore && props.refStore.indexOf(this) < 0) {
      props.refStore.push(this);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.shakeTimeout);
  }

  @computed get errors() {
    return this.validators
      .map(condition => {
        if (condition[1](this.value)) {
          return condition[0];
        }
        return false;
      })
      .filter(error => error);
  }

  @action setValue(value) {
    this.validating = true;
    this.value = value;
  }

  shake() {
    this.shaking = true;
    clearTimeout(this.shakeTimeout);
    this.shakeTimeout = setTimeout(() => {
      this.shaking = false;
    }, 300);
  }

  render() {
    const props = {
      onChange: this.props.onChange || (e => this.setValue(e.target.value)),
      value: this.value,
    };
    if (this.props.enabled) {
      props.valid = this.validating && this.errors.length === 0;
      props.errors = (this.validating && this.errors.length) ? this.errors : undefined;
    }

    return (
      <div className={classNames({'animate-shaking': this.shaking})}>
        <PropsProvider {...props}>
          {this.props.children}
        </PropsProvider>
      </div>
    );
  }
}

Validator.propTypes = {
  validators: React.PropTypes.arrayOf(React.PropTypes.array),
  defaultValue: React.PropTypes.string,
  children: PropsProvider.PropType,
  refStore: React.PropTypes.array,
  enabled: React.PropTypes.bool
};

Validator.defaultProps = {
  validators: [],
  enabled: true
};

Validator.constraint = {
  notBlank: ['Must not be blank', (value) => value.length === 0],
  length: {
    min: length => [`Must be at least ${length} characters`, value => value.length < length],
    max: length => [`Must not exceed ${length} characters`, value => value.length > length],
  },
  email: ['Must be a valid email address', value => !isEmail(value)],
};