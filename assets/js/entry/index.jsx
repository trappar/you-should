import Decision from '../components/decision/Decision.jsx';

var choices = [
    { text: 'Play guitar' },
    { text: 'Play piano' },
    { text: 'Play drums' }
];

React.render(
    <Decision theme="deep-purple" choices={choices} />,
    document.getElementById('container')
);