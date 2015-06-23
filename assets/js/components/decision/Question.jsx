import React, {PropTypes} from 'react';
import classNames from 'classnames';
import DeleteButton from '../primitives/DeleteButton.jsx';
import Button from '../primitives/Button.jsx';

let PLACEHOLDER_QUESTION = 'Enter a question here!';

export default React.createClass({
  propTypes: {
    theme: PropTypes.string.isRequired,
    configuring: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onQuestionChanged: PropTypes.func.isRequired,
    children: PropTypes.node
  },
  getInitialState: function() {
    return {
      deleteConfirmation: false
    };
  },
  handleEdit: function(event) {
    event.stopPropagation();
    this.props.onEdit();
  },
  focus: function() {
    if (this.props.configuring) {
      React.findDOMNode(this.refs.input).focus();
    }
  },
  render: function() {
    let classes = classNames(
      'question', 'row',
      this.props.theme,
      {clickable: !this.props.configuring}
    );

    let questionControl;
    if (this.props.configuring) {
      questionControl = (
        <input ref="input" type="text" className="form-control"
               value={this.props.children}
               placeholder={PLACEHOLDER_QUESTION}
               onChange={(evt) => this.props.onQuestionChanged(evt.target.value)}/>
      );
    } else {
      questionControl = (this.props.children.length > 0) ? this.props.children : PLACEHOLDER_QUESTION;
    }

    let editControl = (!this.state.deleteConfirmation) ?
      <Button onClick={this.handleEdit} extraClasses={`btn-alt-${this.props.theme}`}>
        <span className="glyphicon glyphicon-pencil"></span>
      </Button>
      : null;

    return (
      <div className={classes} onClick={this.props.configuring ? null : this.props.onClick}>
        <div className={this.state.deleteConfirmation ? 'col-xs-8' : 'col-xs-8'}>
          {questionControl}
        </div>
        <div className="controls pull-right">
          {editControl}
          <DeleteButton extraClasses={`btn-alt-${this.props.theme}`}
                        onConfirm={(state) => this.setState({deleteConfirmation: state})}
                        onDelete={this.props.onRemove}/>
        </div>
      </div>
    );
  }
});
