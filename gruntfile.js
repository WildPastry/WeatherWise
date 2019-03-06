module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // TASKS

        // UGLIFY
        uglify: {
            build: {
                src: 'src/js/main.js',
                dest: 'dist/js/main.min.js'
            }
        },
        jshint: {
            all: ['gruntfile.js', 'src/**/*.js', 'dist/**/*.js'],
            options: {
                globals: {
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // WATCH
        watch: {
            js: {
                files: '**/*.js',
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: '**/*.css',
                options: {
                    livereload: true,
                },
            },
        },

    });

    // LOAD TASKS
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // REGISTER TASKS
    grunt.registerTask('default', ['watch', 'jshint', 'uglify']);

};