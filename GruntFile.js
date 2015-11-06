/**
 * Created by amr on 11/6/15.
 */

module.exports = function(grunt){

    //Configure grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    //Load Npm Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Register Tasks
    grunt.registerTask('build', ['uglify']);

};