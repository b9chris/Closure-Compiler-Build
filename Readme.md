An example build of the Closure Library, in this case building the goog.editor.SeamlessField rich-text editor Google uses in products like Gmail.

#Overview
You can find Google's documentation a bit scattered over these 2 pages:

https://developers.google.com/closure/compiler/docs/gettingstarted_app

https://developers.google.com/closure/library/docs/closurebuilder

#How to Build
To build the file, run build.bat

You'll need to have [Java installed](http://www.java.com/inc/BrowserRedirect1.jsp?locale=en) - the JRE, you don't need the JDK - and [Python 2.x](https://www.python.org/download/releases/2.7.7/) ([NOT 3.x!](http://stackoverflow.com/a/16956979/176877)).

You should also add both to your path.

#How It Works
build.bat uses the following command:

    closure-library\closure\bin\build\closurebuilder.py --root=closure-library
    --root=Editor --namespace="Editor" --output_mode=compiled
    --compiler_jar=ClosureCompiler\compiler.jar --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"
    --compiler_flags="--externs" --compiler_flags="externs.js" --output_file=Editor.min.js

##Detailed Breakdown of build.bat
	closure-library\closure\bin\build\closurebuilder.py

Although most of the docs talk about using compiler.jar directly, if you're going to use a class from the Closure Library you'll be asked to build a complicated dependencies file first, and closurebuilder.py automates that for you. It calls compiler.jar on your behalf.

	--root=closure-library --root=Editor

These point to the folders you want to include in the compilation. Generally you use the path to the closure-library, and the path to any other code you're compiling in. The calls don't care if you use forward or backwards slashes, so if the path was deeper both `--root=Editor/dir1/dir2` and `--root=Editor\dir1\dir2` would work fine.

	--namespace="Editor"

This isn't actually the namespace being generated - it's the namespace and classname being generated. In this case the class being goog.provide()'d is named simply, Editor, so here we are.

	--output_mode=compiled

This tells it to call compiler.jar on behalf

	--compiler_jar=ClosureCompiler\compiler.jar
	
And where to find it

	--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"
	
This tells compiler.jar to use advanced optimizations, maximizing minification including dead code removal.
	
	--compiler_flags="--externs" --compiler_flags="externs.js"
	
This is a hack to cope with a bug in closurebuilder.py. Most arguments to compiler.jar look like `--arg=blah` but the externs call needs to look like `--externs externs.js`, with a space. If you pass this argument the intuitive way, it blows up because of the space. This hack resolves the issue.

The externs in this case are just there to prevent the minifier trampling common globals, `$` and `_` for jQuery and Underscore, in case you happen to be using them.

	--output_file=Editor.min.js
    
The name of the file to minify to.

#Breakdown of Editor\Editor.js

	goog.provide('Editor');
	
The namespace and name of the class we're emitting. You can do this differently and keep the classnames in Closure, but it's a bit better for minification to rename the classes you'll be directly calling to short classnames without a namespace.
	
	goog.require('goog.editor.SeamlessField');
	
Use one or more of these to name the classes you're trying to get access to in the Closure Library. 
	
	window['Editor'] = goog.editor.SeamlessField;
	
This again tells the compiler that "Editor" is the name of the class to emit, and what class it's an alias for. The name needs to match what you used in `goog.provide()`.
	
	var p = goog.editor.SeamlessField.prototype;
	
An alias for the prototype to make the following lines simpler.
	
	p['makeEditable'] = p.makeEditable;
	
For each class you're emitting, all its methods will be minified or more likely removed as dead code, unless you explicitly export them as is done on this line.
