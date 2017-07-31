module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// watch: {
		// 	build: {
		// 		files: ['./build/ldf-img.js'],
		// 		tasks: ['uglify'],
		// 		options: {
		// 			spawn: false
		// 		}
		// 	}
		// },
		uglify: {
			options: {
				banner: ' /* ' +
				'\n * <%= pkg.name %> ' +
				'\n * version: <%= pkg.version %> ' +
				'\n * @author: <%= pkg.author %> ' +
				'\n * githup: <%= pkg.repository.url %>'+
				'\n * <%= grunt.template.today("yyyy-mm-dd") %> ' +
				'\n * */'
			},
			my_target: {
				files: {
					'./build/ldf-img.min.js': ['./build/ldf-img.js']
				}
			}
		}
	});
	
//	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify']);
	
}
