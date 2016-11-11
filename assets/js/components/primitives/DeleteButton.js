import React from 'react';
import Button from './Button';
import Icon from './Icon';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

@observer
export default class DeleteButton extends React.Component {
  @observable confirmation = false;
  @observable confirmed = false;

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  handleRemove(event) {
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
  }

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

    const {onDelete, onConfirm, delay, ...props} = this.props;
    props.disabled = props.disabled || this.confirmed;

    return (
      <Button onClick={(e) => this.handleRemove(e)} {...props} >
        {buttonContents}
      </Button>
    );
  }
}

DeleteButton.propTypes = {
  onDelete: React.PropTypes.func,
  onConfirm: React.PropTypes.func,
  delay: React.PropTypes.number
};

DeleteButton.defaultProps = {
  delay: 1500
};
