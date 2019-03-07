module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // TASKS

        // UGLIFY
        uglify: {
            build: {
                src: 'xxxx/js/main.js',
                dest: 'src/js/main.min.js'
            }
        },

        // CONCAT
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: ['xxxx/main.css'],
              dest: 'src/main.css',
            },
          },

        // JSHINT
        jshint: {
            all: ['gruntfile.js', 'xxxx/**/*.js', 'src/**/*.js'],
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
                    // livereload: true,
                },
            },
            css: {
                files: '**/*.css',
                tasks: ['concat'],
                options: {
                    // livereload: true,
                },
            },
        },

    });

    // LOAD TASKS
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // REGISTER TASKS
    grunt.registerTask('default', ['watch', 'concat', 'jshint', 'uglify']);

};