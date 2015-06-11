module.exports = {
    options: {
        paths: ['node_modules'],
        sourceMap: true,
        sourceMapFileInline: true,
        outputSourceFiles: true,
        relativeUrls: false,
        strictImports: true,
        strictUnits: true,
        strictMath: true,
        plugins: [
            new (require('less-plugin-autoprefix'))({
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            })
        ]
    },
    dev: {
        expand: true,
        cwd: 'assets/style/page',
        src: ['**/*.less'],
        dest: 'web/style/',
        ext: '.css'
    },
    prod: {
        expand: true,
        cwd: 'assets/style/page',
        src: ['**/*.less'],
        dest: 'web/style',
        ext: '.css',
        options: {
            sourceMap: false,
            plugins: [
                new (require('less-plugin-clean-css'))()
            ]
        }
    }
};