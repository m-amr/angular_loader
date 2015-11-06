/**
 * Created by amr on 11/6/15.
 */

module.exports = function(grunt){

    //Configure grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        concat: {
            dist: {
                src: ['src/mainModule.js', 'src/httpInterceptor.js', 'src/config.js', 'src/loaderDirective.js'],
                dest: 'build/<%= pkg.name %>.js'
            }
        }
    });

    //Load Npm Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //Register Tasks
    grunt.registerTask('uglify:files', ['uglify']);
    grunt.registerTask('concat:files', ['concat']);

    grunt.registerTask('build', ['concat:files', 'uglify:files']);



};