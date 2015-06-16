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
        return {
            changed: false
        };
    },
    configChanged: function() {
        this.setState({changed: true});
    },
    handleChoiceChange: function(choice, event) {
        choice.name = event.target.value;
        this.configChanged();
    },
    handleThemeChange: function(newTheme) {
        this.props.themeChanged(newTheme);
        this.configChanged();
    },
    handleCancel: function() {
        this.props.configCancel();
        this.setState({changed: false});
    },
    handleSave: function() {
        this.props.configSave(this.state.choices);
        this.setState({changed: false});
    },
    render: function() {
        var configClasses = classNames('config', 'row', {open: this.props.open});

        var choices = this.props.choices.map(function(choice) {
            return <Choice key={choice.id} priority={choice.priority} value={choice.name}
                onChange={this.handleChoiceChange.bind(null, choice)}/>
        }, this);

        return (
            <div className={configClasses}>
                <h3>Choices</h3>

                {choices}

                <ThemePicker currentTheme={this.props.theme} themeChanged={this.handleThemeChange} />

                <ConfigSaveControl theme={this.props.theme} changed={this.state.changed}
                    onCancel={this.handleCancel} onSave={this.handleSave} />
            </div>
        );
    }
});