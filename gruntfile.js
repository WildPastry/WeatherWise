// NODE SASS
const sass = require('node-sass');

// GRUNT
module.exports = function (grunt) {
	'use strict';

	//  LOAD NPM TASKS
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// GRUNT CONFIG
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// SASS
		sass: {
			compile: {
				options: {
					implementation: sass,
					style: 'compressed',
					sourceMap: true
				},
				files: {
					'src/css/main.css': [
						'src/scss/main.scss',
						'src/scss/**/*.scss'
					]
				}
			}
		},

		// UGLIFY
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */ \n'
			},
			targets: {
				files: {
					'dist/js/main.js': 'src/js/main.js',
				}
			}
		},

		// CLEAN
		clean: {
			js: ['src/js/main.js']
		},

		// JSHINT
		jshint: {
			all: ['src/js/*.js'],
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

		// CONCAT
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */ \n'
			},
			targets: {
				files: {
					'src/js/main.js': ['src/js/**/*.js'],
				}
			}
		},

		// CSS-MIN
		cssmin: {
			files: {
				expand: true,
				cwd: 'src/css/',
				src: ['*.css'],
				dest: 'dist/css/',
			}
		},

		// HTML-MIN
		htmlmin: {
			dev: {
				options: {
					removeComments: true,
					removeEmptyElements: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.html'],
					dest: 'dist'
				}]
			}
		},

		// COPY
		copy: {
			icon: {
				files: [{
					expand: true,
					flatten: true,
					src: ['src/icon/*'],
					dest: 'dist/icon/',
					filter: 'isFile'
				}, ],
			},
			framework: {
				files: [{
					expand: true,
					flatten: true,
					src: ['src/framework/*'],
					dest: 'dist/framework/',
					filter: 'isFile'
				}, ],
			}
		},

		// WATCHERS
		watch: {
			options: {
				dateFormat: function (time) {
					grunt.log.writeln('Task complete in ' + time + 'ms');
					grunt.log.writeln('Waiting...');
				},
			},
			scripts: {
				files: ['src/js/**/*.js', '!src/js/main.js'],
				tasks: ['jshint', 'clean', 'concat']
			},
			sass: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass']
			},
			html: {
				files: ['src/**/*.html'],
			},
		}

	}); //GRUNT CONFIG

	// TASKS
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['jshint', 'clean', 'concat', 'sass', 'cssmin', 'uglify', 'htmlmin', 'copy']);

} //GRUNT