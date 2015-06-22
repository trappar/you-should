import Slider from 'bootstrap-slider';

export default React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        sliderOpts: React.PropTypes.object.isRequired
    },
    getDefaultProps: function() {
        return {
            step: 1
        }
    },
    componentDidMount: function() {
        this.slider = new Slider(this.getDOMNode(), this.props.sliderOpts);
        this.slider.on("change", (e) => {
            if (this.props.onChange) {
                this.props.onChange(e.newValue);
            }
        });
    },
    render: function() {
        return (
            <input/>
        );
    }
});