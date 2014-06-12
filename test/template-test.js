var grunt = require('grunt');

exports.jst = {
    main: function (test) {
        'use strict';

        var expect, result;

        test.expect(9);

        expect = grunt.file.read("test/expected/jst.js").replace(/\r\n/g, "\n");
        result = grunt.file.read("tmp/jst.js").replace(/\r\n/g, "\n");
        test.equal(expect, result, "should compile underscore templates into JST");

        expect = grunt.file.read("test/expected/module_jst.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/module_jst.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should create a modulized template");

        expect = grunt.file.read("test/expected/uglyfile.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/uglyfile.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should escape single quotes in filenames");

        expect = grunt.file.read("test/expected/ns_nested.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/ns_nested.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should define parts of nested namespaces");

        expect = grunt.file.read("test/expected/ns_nested.js").replace(/\r/g, "").replace(/\n/g, ""); // same as previous test
        result = grunt.file.read("tmp/ns_nested_this.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should define parts of nested namespaces, ignoring this.");

        expect = grunt.file.read("test/expected/pretty.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/pretty.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should make the output be 1 line per template, making the output less ugly");

        expect = grunt.file.read("test/expected/amd_wrapper.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/amd_wrapper.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should wrap the template with define for AMD pattern");

        expect = grunt.file.read("test/expected/pretty_amd.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/pretty_amd.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "should make the AMD wrapper output pretty");

        expect = grunt.file.read("test/expected/ejs.js").replace(/\r/g, "").replace(/\n/g, "");
        result = grunt.file.read("tmp/ejs.js").replace(/\r/g, "").replace(/\n/g, "");
        test.equal(expect, result, "compiling ejs template");

        test.done();
    }
};
