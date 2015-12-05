module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        buildCore: {
            options: {
                sourceMap: 'script.min.js.map'
            },
            files: [{ 
                src: 'build/script.js',  // source files mask
                dest: '',    // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }]
        }
      
    },
   
    concat: {
        js:{
            src:'js/*.js',
            dest :'build/script.js'
        },
        css:{
            src:'css/*.css',
            dest :'build/style.css'
        }
    },

    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: {
                'style.min.css': ['build/style.css']
            }
        }
    },
    clean: {
        js: ['build']
    },
    watch: {
        js:  { files: 'js/*.js', tasks: ['concat:js', 'uglify'] },
        css:  { files: 'css/*.css', tasks: ['concat:css', 'cssmin'] }
    }

    
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');

// register at least this one task
grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);


};