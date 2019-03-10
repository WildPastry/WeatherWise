// GRUNT
const sass = require('node-sass');
module.exports = function (grunt) {
	'use strict';
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		clean: {
			js: ['src/js/main.js']
		},
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
		cssmin: {
			files: {
				expand: true,
				cwd: 'src/css/',
				src: ['*.css'],
				dest: 'dist/css/',
			}
		},
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
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['jshint', 'clean', 'concat', 'sass', 'cssmin', 'uglify', 'htmlmin', 'copy']);
}