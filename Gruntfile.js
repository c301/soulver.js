module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jison');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                expand: true,
                flatten: true,
                cwd: 'src',
                src: ['*.coffee'],
                dest: 'bin/',
                ext: '.js'
            }
        },
        less: {
            compile:{
                options: {
                    paths: ["src"],
                    cleancss: true
                },
                expand: true,
                flatten: true,
                cwd: 'src',
                src: ['*.less'],
                dest: 'bin/',
                ext: '.css'
            }
        },
        jison: {
            compile : {
                expand: true,
                flatten: true,
                cwd: 'src',
                src: ['*.jison'],
                dest: 'bin/',
                ext: '.js'
            }
        }

    });

    grunt.registerTask('default', ['coffee:compile', 'less:compile', 'jison:compile']);
};