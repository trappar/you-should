import classNames from 'classnames';

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        onThemeChange: React.PropTypes.func
    },
    handleClick: function(event) {
        if (this.props.themeChanged) {
            this.props.themeChanged(this.props.theme);
        }
    },
    render: function() {
        var classes = classNames(
            'swatch',
            this.props.theme,
            { clickable: this.props.themeChanged }
        );

        return (
            <div className={classes} onClick={this.handleClick}></div>
        );
    }
});