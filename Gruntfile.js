module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// watch: {
		// 	build: {
		// 		files: ['./build/capricorncd-image-process.js'],
		// 		tasks: ['uglify'],
		// 		options: {
		// 			spawn: false
		// 		}
		// 	}
		// },
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> | version: <%= pkg.version %> | author: <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			my_target: {
				files: {
					'./build/ldf-img-canvas.min.js': ['./build/ldf-img-canvas.js']
				}
			}
		}
	});
	
//	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify']);
	
}
