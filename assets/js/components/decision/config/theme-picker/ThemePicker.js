import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Swatch from './Swatch.js';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

let THEMES = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green',
  'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'grey', 'blue-grey', 'brown',
];

@observer
export default class ThemePicker extends Component {
  @observable open = false;

  toggleContainer = () => this.open = !this.open;
  blurContainer = () => this.open = false;
  changeTheme = (theme) => () => this.props.themeChanged(theme);

  render() {
    let containerClasses = classNames(
      'swatch-container',
      { open: this.open }
    );

    let allSwatches = THEMES.map(function(theme) {
      return (
        <Swatch
          theme={theme}
          key={theme}
          onMouseDown={this.changeTheme(theme)}
        />
      );
    }, this);

    return (
      <div className="theme-picker-container row">
        Theme

        <div className="theme-picker">
          <Swatch
            onClick={this.toggleContainer}
            onBlur={this.blurContainer}
            theme={this.props.currentTheme}
          />

          <div className={containerClasses}>
            {allSwatches}
          </div>
        </div>
      </div>
    );
  }
}
ThemePicker.propTypes = {
  currentTheme: PropTypes.string,
  themeChanged: PropTypes.func,
};
