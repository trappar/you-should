import classNames from 'classnames';

export default React.createClass({
    getDefaultProps: function() {
        return {
            open: false,
            answer: false,
            loading: false
        };
    },
    render: function() {
        var answerClasses = classNames(
            'answer',
            'row',
            this.props.theme,
            {
                open: this.props.open,
                loading: this.props.loading
            }
        );

        var answer = (this.props.answer) ? this.props.answer : 'No choices have been defined yet';
        var controls = (this.props.answer) ?
            <div className="controls pull-right">
                <button className="btn btn-success">
                    <span className="glyphicon glyphicon-ok"></span>
                &nbsp;OK!
                </button>
                <button className="btn btn-danger">
                    <span className="glyphicon glyphicon-remove"></span>
                &nbsp;No way!
                </button>
            </div>
            : null;

        return (this.props.loading)
            ?
            <div className={answerClasses}>
                <span>Loading...</span>
            </div>
            :
            <div className={answerClasses}>
                <div className="pull-left">
                    {answer}
                </div>
                {controls}
            </div>;
    }
});