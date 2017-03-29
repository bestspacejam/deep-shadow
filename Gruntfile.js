/*global module:false*/

module.exports = function(grunt)
{
	grunt.initConfig({
		sass: {
			options: {
				// sourceMap: true
			},
			
			dist: {
				files: {
					'dist/lib/deepshadow.css': 'src/lib/deepshadow.scss',
					'dist/style.css': 'src/style.scss'
				}
			}
		},
		
		cssmin: {
			testpage_concat: {
				files: {
					// 'css/index.css': ['src/css/style.css', 'dist/lib/deepshadow.css']
					'css/index.css': ['dist/style.css', 'dist/lib/deepshadow.css']
				}
			},
			 
			releaselib: {
				files: {
					'dist/lib/deepshadow.min.css': 'dist/lib/deepshadow.css'
				}
			}
		},
		
		processhtml: {
			dist: {
				options: {
					process: true
				},
			
				files: {
					'dist/test/index.html': ['src/index.html']
				}
			}
		},
		
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				
				files: {
					'dist/test/index.html': ['dist/test/index.html']
				}
			}
		},
		
		clean: {
			testpage_css_files: ['css/']
		},
		
		
		watch: {
			sources: {
				files: 'src/**/*',
				tasks: ['default'],
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-processhtml');
	// grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	// Default task.
	grunt.registerTask('default', [
		'sass',
		'cssmin:testpage_concat',
		'cssmin:releaselib',
		'processhtml',
		// 'htmlmin',
		'clean:testpage_css_files'
	]);
	
	grunt.registerTask('reload', ['watch']);
};
