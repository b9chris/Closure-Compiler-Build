To use Google Closure Compiler with ADVANCED_OPTIMIZATIONS (let's call that GCC with AdvOpt to avoid typing that out over and over), you need 2 things:

1. A proper externs file, to avoid dead code removal on things jQuery needs to function properly

2. Some way of being aware of what parts of jQuery you intend to use.

So:

#Externs

The externs file is solved on the Google side of things, here:

https://github.com/google/closure-compiler/tree/master/contrib/externs

Just grab the most recent externs file - in this case 1.9 - should work fine with 1.10.x and 2.x since it doesn't have to change much as jQuery versions forward.

#What Parts of JQuery You'll Be Using

This is complicated mostly because of how different people's build configs can be. Google's minification isn't much better than competing options out there except when it comes to dead code removal. In other words if you're asking to use GCC with AdvOpt to just surface all of jQuery, you're asking to waste your own time. Or, waste someone else's hoping they'll do it for you.

But if you can benefit from dead code removal - because you're only using certain parts of jQuery - the savings can be huge.

##Dead Code Removal

For example if all you're using jQuery for is to select some tags and apply some events, all you really need is jQuery's constructor and .on(), and the rest will be removed as dead code by ADVANCED_OPTIMIZATIONS. You'll basically cut jQuery in half - a huge win.

So how do you tell it what you're using:

###Option 1: Minify everything (easiest)
Easiest, at least, if you can get all your files into one place - really depends on the project. If you minify everything for a given page into a single file, then between your code and the jQuery externs file the GCC will wipe out not only dead code in jQuery, but also library code not used in your own files. You'll get the most minification and you'll have to do the least planning.

###Option 2: State what you're using with ['name']
Most builds have GCC running over here to make a build of jQuery and then that minified file is used and reused somewhere else, meaning you can't minify everything together all at once. The simplest way to handle this is to put jQuery src in a dir with its externs file, then add a third file that just sets out the methods you need, like so:

    window['$'] = jQuery; // Surface jQuery itself
    
    var p = jQuery.prototype; // Just to shorten below surfacing of instance methods
    
    p['on'] = p.on; // Surface an instance method

Then you run closure compiler like:

    java -jar compiler.jar