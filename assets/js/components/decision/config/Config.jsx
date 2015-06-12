import classNames from 'classnames';
import ThemePicker from './theme-picker/ThemePicker.jsx';
import Choice from './Choice.jsx';

export default React.createClass({
    propTypes: {
        choices: React.PropTypes.array.isRequired
    },
    getDefaultProps: function() {
        return {
            open: false
        };
    },
    render: function() {
        var configClasses = classNames('config', 'row', {'config-open': this.props.open});

        var choices = this.props.choices.map(function(choice) {
            return <Choice text={choice.text} />
        });

        return (
            <div className={configClasses}>
                <ThemePicker theme="blue"/>
                <div className="row">
                    <div className="col-xs-8">
                        {choices}
                    </div>
                </div>
                <span className="glyphicon glyphicon-plus"></span>
            </div>
        );
    }
});