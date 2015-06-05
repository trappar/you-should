var path = require('path');
var grunt = require('grunt');

// This finds js files in assets/js/entry and builds a webpack entry object out of them
module.exports = function() {
    var cwd = 'assets/js/entry';
    return grunt.file.expand({cwd: cwd}, '**/*.js').reduce(function(obj, value){
        obj[value.replace(/\.[^.]+$/, '')] = './' + path.join(cwd, value);
        return obj;
    }, {});
};
