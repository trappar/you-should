module.exports = {
    options: {
        spawn: false,
        interrupt: false,
        livereloadOnError: false,
        atBegin: true,
        livereload: 35729
    },
    less: {
        files: ['assets/style/**/*.less'],
        tasks: ['less:dev']
    }
};