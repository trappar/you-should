import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';
import Button from './Button';
import Icon from './Icon';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class DeleteButton extends Component {
  @observable confirmation = false;
  @observable confirmed = false;

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  handleRemove = (event) => {
    event.stopPropagation();
    if (!this.confirmed) {
      if (this.confirmation === false) {
        this.confirmation = true;
        if (this.props.onConfirm) {
          this.props.onConfirm(true);
        }
        this.timeout = setTimeout(() => {
          if (this.props.onConfirm) {
            this.props.onConfirm(false);
          }
          this.confirmation = false;
        }, this.props.delay);
      } else {
        clearTimeout(this.timeout);
        this.confirmed = true;
        if (this.props.onDelete) {
          this.props.onDelete();
        }
      }
    }
  };

  render() {
    let buttonContents;

    if (!this.confirmed) {
      if (!this.confirmation) {
        buttonContents = <Icon type="trash"/>;
      } else {
        buttonContents = 'You sure?';
      }
    } else {
      buttonContents = 'Removing';
    }

    const props = omit(this.props, ['onDelete', 'onConfirm', 'delay']);
    props.disabled = props.disabled || this.confirmed;

    return (
      <Button onClick={this.handleRemove} {...props} >
        {buttonContents}
      </Button>
    );
  }
}
DeleteButton.propTypes = {
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
  delay: PropTypes.number
};
DeleteButton.defaultProps = {
  delay: 1500
};
