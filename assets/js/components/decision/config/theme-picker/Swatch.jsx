import classNames from 'classnames';

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        onThemeChange: React.PropTypes.func
    },
    handleClick: function(event) {
        if (this.props.onThemeChange) {
            this.props.onThemeChange(this.props.theme);
        }
    },
    render: function() {
        var classes = classNames(
            'swatch',
            this.props.theme,
            { clickable: this.props.onThemeChange }
        );

        return (
            <div className={classes} onClick={this.handleClick}></div>
        );
    }
});