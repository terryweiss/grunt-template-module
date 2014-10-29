/*
 * grunt-contrib-jst
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function ( grunt ) {

	// Project configuration.
	grunt.initConfig( {
		beautify : {
			tests : 'test/template-test.js',
			files : ['package.json', 'grunt.js', 'tasks/*.js']
		},

		jshint : {
			options : {
				curly : true,
				eqeqeq : true,
				immed : true,
				latedef : true,
				newcap : true,
				noarg : true,
				sub : true,
				undef : true,
				boss : true,
				eqnull : true,
				node : true,
				es5 : true,
				strict : false
			},

			all : ['grunt.js', 'tasks/**.js', 'test/template-test.js']

		},
		beautifier : {
			options : {
				indentSize : 4,
				indentChar : "\t",
				maxPreserveNewlines : 1

			}
		},

		//
		// Configuration to be run (and then tested).
		"template-module" : {
			compile : {
				files : {
					"tmp/jst.js" : ["test/fixtures/template.html"]
				},
				options : {
					module : false,
					useStrict : true
				}
			},
			compile_module : {
				files : {
					"tmp/module_jst.js" : ["test/fixtures/template.html"]
				},
				options : {
					module : true,
					useStrict : false
				}
			},
			pretty_amd : {
				options : {
					prettify : true,
					amdWrapper : true,
					useStrict : false
				},
				files : {
					"tmp/pretty_amd.js" : ["test/fixtures/template.html"]
				}
			},
			prettify : {
				options : {
					prettify : true,
					module : false,
					useStrict : false
				},
				files : {
					"tmp/pretty.js" : ["test/fixtures/template.html"]
				}
			},
			amd_wrapper : {
				options : {
					amdWrapper : true,
					useStrict : false

				},
				files : {
					"tmp/amd_wrapper.js" : ["test/fixtures/template.html"]
				}
			},
			uglyfile : {
				files : {
					"tmp/uglyfile.js" : ["test/fixtures/*bad-filename*"]
				}
			},
			ns_nested : {
				options : {
					namespace : "MyApp.JST.Main",
					useStrict : false
				},
				files : {
					"tmp/ns_nested.js" : ["test/fixtures/template.html"]
				}
			},
			ns_nested_this : {
				options : {
					namespace : "this.MyApp.JST.Main",
					useStrict : false
				},
				files : {
					"tmp/ns_nested_this.js" : ["test/fixtures/template.html"]
				}
			},
			ejsfile : {
				options : {
					namespace : "EJS",
					provider : "ejs",
					useStrict : false
				},
				files : {
					"tmp/ejs.js" : ["test/fixtures/template.html"]
				}
			},
			ejsfilemodule : {
				options : {
					module : true,
					provider : "ejs",
					useStrict : false
				},
				files : {
					"tmp/ejsmodule.js" : ["test/fixtures/template.html"]
				}
			},
			compile_single_module : {
				files : {
					"tmp/single_module_jst.js" : ["test/fixtures/template.html"]
				},
				options : {
					module : true,
					useStrict : false,
					single: true
				}
			},
		},
		//
		// Unit tests.
		nodeunit : {
			all : ['test/template-test.js']
		}
	} );

	//	Actually load this plugin's task(s).
	grunt.loadTasks( 'tasks' );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-beautify' );

	grunt.registerTask( 'test', ['template-module', 'nodeunit'] );
	grunt.registerTask( "publish", ["jshint:all", /*"beautify",*/ "test"] );

	// By default, lint and run all tests.
	grunt.registerTask( 'default', ['test'] );

};
