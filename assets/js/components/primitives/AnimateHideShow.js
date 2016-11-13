import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';

export default class AnimateHideShow extends Component {
  componentWillEnter(callback) {
    $(ReactDOM.findDOMNode(this)).hide();
    $(ReactDOM.findDOMNode(this)).show(this.props.showDuration, callback);
  }

  componentWillLeave(callback) {
    $(ReactDOM.findDOMNode(this)).hide(this.props.hideDuration, callback);
  }

  render() {
    return this.props.children;
  }
}
AnimateHideShow.propTypes = {
  hideDuration: PropTypes.number,
  showDuration: PropTypes.number,
};
AnimateHideShow.defaultProps = {
  hideDuration: 100,
  showDuration: 100,
};
