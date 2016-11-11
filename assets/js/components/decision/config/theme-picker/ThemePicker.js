import React, {PropTypes} from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import Swatch from './Swatch.js';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

let THEMES = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'light-green',
  'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
];

@observer
export default class ThemePicker extends React.Component {
  @observable open = false;

  openContainer() {
    this.closeContainer.cancel();
    this.open = true;
  }

  closeContainer() {
    this.open = false;
  }

  componentWillMount() {
    this.closeContainer = debounce(this.closeContainer, 300);
  }

  componentWillUnmount() {
    this.closeContainer.cancel();
  }

  render() {
    let containerClasses = classNames(
      'swatch-container',
      {open: this.open}
    );

    let allSwatches = THEMES.map(function(theme) {
      return (
        <Swatch
          theme={theme}
          key={theme}
          onClick={() => this.props.themeChanged(theme)}
        />
      );
    }, this);

    return (
      <div className="theme-picker-container row">
        Theme

        <div className="theme-picker">
          <Swatch
            onClick={() => this.open = !this.open}
            onBlur={debounce(() => {
              this.open = false
            }, 100)}
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
  currentTheme: PropTypes.string.isRequired,
  themeChanged: PropTypes.func
};
