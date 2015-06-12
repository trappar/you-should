import classNames from 'classnames';

export default React.createClass({
    render: function() {
        var classes = classNames(
            'swatch',
            this.props.theme,
            {clickable: this.props.onClick}
        );

        return (
            <div className={classes} onClick={this.props.onClick}></div>
        );
    }
});