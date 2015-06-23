import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    theme: PropTypes.string.isRequired,
    themeChanged: PropTypes.func
  },
  handleClick: function() {
    if (this.props.themeChanged) {
      this.props.themeChanged(this.props.theme);
    }
  },
  render: function() {
    let classes = classNames(
      'swatch',
      this.props.theme,
      {clickable: this.props.themeChanged}
    );

    return (
      <div className={classes} onClick={this.handleClick}></div>
    );
  }
});
