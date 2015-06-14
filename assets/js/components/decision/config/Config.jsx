import classNames from 'classnames';
import Choice from './Choice.jsx';
import ThemePicker from './theme-picker/ThemePicker.jsx';
import ConfigSaveControl from './ConfigSaveControl.jsx';

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        choices: React.PropTypes.array.isRequired
    },
    getDefaultProps: function() {
        return {
            open: false
        };
    },
    getInitialState: function() {
        return {changed: false}
    },
    onThemeChange: function(newTheme) {
        this.props.onThemeChange(newTheme);
        this.setState({changed: true});
    },
    render: function() {
        var configClasses = classNames('config', 'row', {'config-open': this.props.open});

        var choices = this.props.choices.map(function(choice) {
            return <Choice key={choice.id} priority={choice.priority} value={choice.name}/>
        }, this);

        return (
            <div className={configClasses}>
                <h3>Choices</h3>
                {choices}
                <ThemePicker currentTheme={this.props.theme} onThemeChange={this.onThemeChange} />
                <ConfigSaveControl theme={this.props.theme} changed={this.state.changed} />
            </div>
        );
    }
});