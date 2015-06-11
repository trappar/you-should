import classNames from 'classnames';

export default React.createClass({
    getDefaultProps: function() {
        return {
            open: false
        };
    },
    render: function() {
        var configClasses = classNames('config', 'row', {'config-open': this.props.open});

        return (
            <div className={configClasses}>
                <ul className="choices">
                    <li>Play guitar</li>
                    <li>Play drums</li>
                    <li>Play piano</li>
                    <li><span className="glyphicon glyphicon-plus"></span></li>
                </ul>
            </div>
        );
    }
});