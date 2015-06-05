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
        'copy',
        'less:tracker',
        'less:review_sites',
        'webpack-dev',
        'webpack',
        'webpack-save-stats'
    ]);

    grunt.registerTask('dev:watch', [
        //'clean',
        //'copy',
        //'webpack-dev',
        'watch'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'copy',
        'less:tracker_prod',
        'less:review_sites_prod',
        'webpack-prod',
        'webpack'
    ]);

    grunt.registerTask('dev:db', ['shell:drop_database', 'shell:vagrant_provision']);
    grunt.registerTask('dev:db:new', ['concurrent:remove_cached_database', 'shell:vagrant_provision']);
};