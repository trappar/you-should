var buildEntries = require('../module/buildEntries');

module.exports = function(grunt) {
    // This automatically rebuilds the webpack entries object if files are added/deleted
    grunt.event.on('watch', function(action, filepath, target) {
        if (target == 'js' && (action == 'added' || action == 'deleted' || action == 'renamed')) {
            grunt.config('webpack.dev.entry', buildEntries());
        }
    });

    return {
        options: {
            spawn: false,
            interrupt: false,
            livereloadOnError: false,
            atBegin: true,
            livereload: 35729
        },
        less: {
            files: ['assets/**/*.less'],
            tasks: ['less:dev']
        },
        js: {
            files: ['assets/**/*.js', 'assets/**/*.jsx'],
            tasks: ['webpack:dev']
        }
    };
};