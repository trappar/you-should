import React, {PropTypes} from 'react';
import Slider from 'bootstrap-slider';

class BootstrapSlider extends React.Component {
  componentDidMount() {
    this.slider = new Slider(this._input, this.props.sliderOpts);
    this.slider.on('change', (e) => {
      if (this.props.onChange) {
        this.props.onChange(e.newValue);
      }
    });
  }

  render() {
    const {onChange, sliderOpts, ...restProps} = this.props;
    return (
      <input ref={c => this._input = c} {...restProps}/>
    );
  }
}

BootstrapSlider.propTypes = {
  onChange: PropTypes.func,
  sliderOpts: PropTypes.object.isRequired
};

export default BootstrapSlider;
