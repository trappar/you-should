import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';
import Slider from 'bootstrap-slider';

export default class BootstrapSlider extends Component {
  componentDidMount() {
    this.slider = new Slider(this._input, this.props.sliderOpts);
    this.slider.on('change', (e) => {
      if (this.props.onChange) {
        this.props.onChange(e.newValue);
      }
    });
  }

  render() {
    return (
      <input ref={c => this._input = c} {...omit(this.props, ['onChange', 'sliderOpts'])}/>
    );
  }
}
BootstrapSlider.propTypes = {
  onChange: PropTypes.func,
  sliderOpts: PropTypes.object.isRequired
};
