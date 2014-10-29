# grunt-template-module #

> Precompile templates to a file and/or expose the templates through a module.

This is an awful lot like the existing [grunt-contrib-jst](https://github.com/gruntjs/grunt-contrib-jst) grunt task. But it has a few
differences. One is that it supports <code>underscore</code>, <code>lodash</code> and <code>ejs</code> template providers. The real
key feature is that it allows you to compile these templates into a module that exposes each compiled template from an <code>exports</code>
property. What this means is that if you provide the following configuration:

    template-module: {
        myTemplates:{
	        files: {
	            "tmp/module_jst.js": ["test/fixtures/template.html"]
	        }
	        options: {
	            module: true
	        }
	    }
    }

You would end up with an entry in <code>module_jst.js</code> that looks like:

    exports["tmp/module_jst.js"] = function(obj){...

I know. You're wondering why do such a thing? Doesn't <code>contrib-jst</code> offer an AMD wrapper? Yes, it does, but it is a very noisy way
to get at it on the server. As well, if you use [browserify](https://github.com/substack/node-browserify), this will play much better with
the compiled browserified (is that a word?) output.

So there you have it. Browserify and server happiness for underscore/lodash and EJS templates. And backward compatibility with <code>contrib-jst</code>.

And one more thing: prettify uses beautify instead. Let's try that again. The prettify option in the original used some very simple code to pretty things up. Instead it
now uses [node-beautify](https://github.com/fshost/node-beautify).


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-template-module
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## template-module task
Run this task with `grunt template-module` at the command line.

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks

### Usage

```js
template-module: {
  compile: {
    options: {
      module: true,
      provider: 'lodash'
    },
    files: {
      "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
    }
  }
}
```

### Options

#### module
Type: 'Boolean'
Default: true

When true, the module behavior described above will be delivered with love and chocolate.

#### provider
Type 'String'
Default: underscore

The name of the template engine to use. Allowable values are <code>*underscore*</code> <code>*lodash*</code> and <code>*ejs*</code>


#### useStrict
Type ```boolean```
Default: false

Enable strict mode by adding ```'strict mode';``` to the output

```javascript
options: {
  useStrict: true
}
```

#### prettify
Type: ```boolean```
Default: false

When doing a quick once-over of your compiled template file, it's nice to see
an easy-to-read format. This will accomplish
that.

```javascript
options: {
  prettify: true
}
```

#### prettifyOptions
Type: ```object```

When you set prettify to `true`, you can pass options to the [beautify module](https://github.com/fshost/node-beautify) in this object.

```javascript
options: {
  prettify: true,
  prettifyOptions:{
      indentSize: 4,
      indentChar: '\t',
      maxPreserveNewlines: 1
  }
}
```

#### single
Type: ```boolean```
Default: false

If enabled and there is only one soruce file, then export the template as a single function. e.g. ```module.exports = function( .... );```

```javascript
options: {
  single: true
}
```


#### namespace
Type: `String`
Default: 'JST'

The namespace in which the precompiled templates will be asssigned.  *Use dot notation (e.g. App.Templates) for nested namespaces.* *This is not used when module is set to true.*

#### processName
Type: ```function```
Default: null

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

```js
options: {
  processName: function(filename) {
    return filename.toUpperCase();
  }
}
```

#### templateSettings
Type: ```Object```
Default: null

The settings passed to the template engine when compiling templates. The options are template engine specific.

```js
template-module: {
  compile: {
    options: {
      templateSettings: {
        interpolate : /\{\{(.+?)\}\}/g
      }
    },
    files: {
      "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
    }
  }
}
```

#### lintExpr
Type: ```Object```
Default: null

If you want to add a comment for lint or hint declarations, you can use this setting to declare the directives.

```js
template-module: {
  compile: {
    options: {
     lintExpr : {
        unused : false,
        asi : true,
        expr : true
     },
    },
    files: {
      "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
    }
  }
}
```

which would produce `/*jshint unused:false, asi:true, expr:true*/` and add it to the bottom of the file.

#### requireProvider
Type: ```boolean```
Default: true

When compiling as with `module: true`, by default we'll prepend `var _ = require('underscore');` to the output. This is fine if you're bundling your `provider` (underscore, lodash, or ejs) in your build.

However, you might not want to bundle your `provider`, for example if you want to load lodash from a CDN. In that case, you'll want to set `requireProvider: false`

#### amdWrapper
Type: ```boolean``` | ```string```
Default: false

With Require.js and a pre-compiled template.js you want the templates to be
wrapped in a define. This will wrap the output in:

``` javascript
define(function() {
  //Templates
  return this["NAMESPACE"];
});
```

Example:
``` javascript
options: {
  amdWrapper: true
}
```

If you want a specific define, you can provide it as string:
``` javascript
options: {
  amdWrapper: 'define("templates", ["i18n"], function(__) {'
}
```
Will result in:
``` javascript
define("templates", ["i18n"], function(__) {
  //Templates
  return this["NAMESPACE"];
});
```

* This is not used when module is set to true.*




## Release History
 * 2012-12-24   v0.1.0  Initial release
 * 2012-12-25   v0.1.1  Fixed documentation and clarified names
 * 2014-06-12   v0.3.0  Updated dependencies
