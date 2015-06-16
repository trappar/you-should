import classNames from 'classnames';
import Swatch from './Swatch.jsx';

var themes = [
    'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'light-green',
    'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
];

export default React.createClass({
    propTypes: {
        currentTheme: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            open: false
        };
    },
    openContainer: function() {
        this.closeContainer.cancel();
        this.setState({
            open: true
        });
    },
    closeContainer: function() {
        this.setState({
            open: false
        });
    },
    componentWillMount: function() {
        this.closeContainer = _.debounce(this.closeContainer, 300)
    },
    render: function() {
        var containerClasses = classNames(
            'swatch-container',
            {open: this.state.open}
        );

        var allSwatches = themes.map(function(theme) {
            return <Swatch theme={theme} key={theme} bordered="true" themeChanged={this.props.themeChanged} />
        }, this);

        return (
            <div className="form-inline">
                <div className="form-group">
                    <label className="control-label">Theme</label>
                    <div className="theme-picker" onMouseOver={this.openContainer} onMouseOut={this.closeContainer}>
                        <Swatch theme={this.props.currentTheme} bordered="true" />
                        <div className={containerClasses}>
                    {allSwatches}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});