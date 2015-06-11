import classNames from 'classnames';

export default React.createClass({
    getDefaultProps: function() {
        return {
            open: false,
            answer: false
        };
    },
    render: function() {
        var answerClasses = classNames('answer', 'row', {
            'answer-open': this.props.open,
            'answer-loading': !this.props.answer
        });

        var contents;
        if (this.props.answer) {
            contents = (
                <div className={answerClasses}>
                    <div className="col-xs-8">
                        {this.props.answer}
                    </div>
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
                </div>
            );
        } else {
            contents = (
                <div className={answerClasses}>
                    <span>Loading...</span>
                </div>
            );
        }

        return contents;
    }
});