/**
 * @fileOverview This is a grunt task to precompile JST files with the option to
 *               expose the result into module.exports rather than a namespace.
 *               This has been forked and modified from grunt-contrib-jst and
 *               differs slightly. It retains all of the options of the
 *               original, but adds a new one called <code>module</code>. This
 *               is like the amdWrapper option, except it will create
 *               exports[filename] = templateCode() instead so that if you use
 *               browserify to package your code, or if you just want to call it
 *               from the server. And this one uses lodash. So there.
 *
 * @module tasks\grunt-jst-module
 * @see http://gruntjs.com/
 * @see https://github.com/gruntjs/grunt-contrib-jst
 * @copyright Copyright (c) 2012 Tim Branyen, contributors, Terry Weiss
 * @license MIT.
 */

'use strict';

var getNamespaceDeclaration = function (ns) {
    var output = [];
    var curPath = 'this';
    if (ns !== 'this') {
        var nsParts = ns.split('.');
        nsParts.forEach(function (curPart, index) {
            if (curPart !== 'this') {
                curPath += '[' + JSON.stringify(curPart) + ']';
                output.push(curPath + ' = ' + curPath + ' || {};');
            }
        });
    }

    return {
        namespace: curPath,
        declaration: output.join('\n')
    };
};

module.exports = function (grunt) {

    // filename conversion for templates
    var defaultProcessName = function (name) {
        return name;
    };

    grunt.registerMultiTask('template-module', 'Compile underscore templates to JST file that can be exposed as a module', function () {
        var sys = require("lodash");
        var beautifier = require("node-beautify");

        var defaultOptions = {
            namespace: null,
            templateSettings: {
                client: true,
                compileDebug: true
            },
            module: true,
            provider: "underscore",
            processName: function (name) {
                return name;
            },
            prettify: false,
            prettifyOptions: {
                indentSize: 2
            }
        };

        var options = sys.extend({}, defaultOptions, this.data.options);
        var templateProvider = require(options.provider);

        var helpers = require('grunt-lib-contrib').init(grunt);

        grunt.verbose.writeflags(options, 'Options');

        var nsInfo;
        // we want to turn module off in the event other setting would collide with it
        if (options.amdWrapper || !sys.isEmpty(options.namespace)) {
            options.module = false;
        }
        if (options.module) {
            options.amdWrapper = false;
            nsInfo = {
                namespace: "exports",
                declaration: ""
            };
        } else {
            options.module = false;
            options.namespace = options.namespace || "JST";
            nsInfo = getNamespaceDeclaration(options.namespace);
        }

        var output = [];
        var compiled, templateName;
        sys.each(this.data.files, function (srcs, dest) {
            var srcFiles = grunt.file.expandFiles(srcs);
            sys.each(srcFiles, function (file) {
                var src = grunt.file.read(file);
                try {
                    if (options.provider === "ejs") {
                        compiled = templateProvider.compile(src, options.templateSettings);
                    } else {
                        compiled = templateProvider.template(src, false, options.templateSettings).source;
                    }


                    templateName = options.processName(file);
                    output.push(nsInfo.namespace + "[" + JSON.stringify(templateName) + "] = " + compiled + ";");
                } catch (e) {
                    grunt.log.error(e);
                    grunt.fail.warn("JST failed to compile.");
                }
            });

            if (output.length > 0) {
                if (!sys.isEmpty(nsInfo.declaration)) {
                    output.unshift(nsInfo.declaration);
                }

                if (options.amdWrapper) {

                    output.unshift("define(function(){");
                    output.push("  return " + nsInfo.namespace + ";\n});");
                } else if (options.module) {
                    output.unshift(["var _ = require('" + options.provider + "');"]);
                }

                var contents = output.join("\n");
                if (options.prettify) {
                    contents = beautifier.beautifyJs(contents, options.prettifyOptions);
                }

                grunt.file.write(dest, contents);
                grunt.log.writeln("File '" + dest + "' created.");
            }
        });


    });
};
