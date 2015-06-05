// global variables for webpack to store cache to
module.exports = function (grunt) {
    var path = require('path');

    // Load some global config
    //var config = require('./grunt/base-config.js');

    // And add in everything from the parameters.yml
    //config.app_config = grunt.file.readYAML('./app/config/parameters.yml').parameters;

    // Load config from
    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, 'grunt/config'),

        jitGrunt: {
            customTasksDir: path.join(__dirname, 'grunt/tasks')
        }//,

        //data: config
    });

    grunt.registerTask('default', 'dev:watch');

    grunt.registerTask('dev', [
        'clean',
        'less:dev',
        'webpack:dev'
    ]);

    grunt.registerTask('dev:watch', [
        'clean',
        'watch'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'less:prod',
        'webpack:prod'
    ]);
};