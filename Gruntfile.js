module.exports = function(grunt) {
    
    require('load-grunt-tasks')(grunt);
    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        responsive_images: {
            landscape: {
                options: {
                    engine: 'im',
                    sizes: [{
                            name: 'small',
                            width: 320,
                          },{
                            name: 'medium',
                            width: 640
                          },{
                            name: "large",
                            width: 800,
                          },{
                            name: "large",
                            width: 1600,
                            suffix: "_x2",
                            quality: 60
                          }]
                },
                files: [{
                    expand: true,
                    cwd: config.imgSrcDir,
                    src: ['landscape/*.{jpg,gif,png,jpeg}'],
                    dest: config.imgDestDir
                }]
            },
            portrait: {
                options: {
                    engine: 'im',
                    sizes: [{
                            name: 'small',
                            width: 320,
                          },{
                            name: 'medium',
                            width: 640
                          },{
                            name: "large",
                            width: 800,
                          }]
                },
                files: [{
                    expand: true,
                    cwd: config.imgSrcDir,
                    src: ['portrait/*.{jpg,gif,png,jpeg}'],
                    dest: config.imgDestDir
                }]
            }
        },
        responsive_images_extender:{
            target: {
                options: {},
                files: [{
                    expand: true,
                    src: ['index.{html,htm,php}'],
                    cwd: 'src',
                    dest: 'dist/'
                }]
            }
        },
        sass: {
            dist :{
                files: [{
                    expand: true,
                    cwd: config.scssDir,
                    src: ['**/*.scss'],
                    dest: config.cssDir,
                    ext: '.css'
                }]
            }
        },
        jshint: {
            all: ['Gruntfile.js']
        },
        watch: {
            css: {
                files: config.scssDir + '*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'jshint', 'responsive_images', 'responsive_images_extender', 'watch']);
};
