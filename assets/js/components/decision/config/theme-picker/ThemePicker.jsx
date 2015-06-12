import classNames from 'classnames';
import Swatch from './Swatch.jsx';

var themes = [
    'red','pink','purple','deep-purple','indigo','blue','cyan','teal','green','light-green',
    'lime','yellow','amber','orange','deep-orange','brown','grey','blue-grey'
];

export default React.createClass({
    getInitialState: function() {
        return {
            open: false
        };
    },
    handleOpenContainer: function() {
        this.setState({
            open: !this.state.open
        })
    },
    render: function() {
        var containerClasses = classNames(
            'swatch-container',
            {open: this.state.open}
        );

        var allSwatches = themes.map(function(theme){
            return <Swatch theme={theme} key={theme} bordered="true" />
        });

        return (
            <div className="theme-picker">
                <Swatch theme="yellow" bordered="true" onClick={this.handleOpenContainer} />
                <div className={containerClasses}>
                    {allSwatches}
                </div>
            </div>
        );
    }
});