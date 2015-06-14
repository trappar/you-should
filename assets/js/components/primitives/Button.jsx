import classNames from 'classnames';

export default React.createClass({
    render: function() {
        var props = _.omit(this.props, 'extraClasses');
        props.className = classNames(
            'btn',
            this.props.extraClasses
        );

        return <button {...props}>{this.props.children}</button>;
    }
});