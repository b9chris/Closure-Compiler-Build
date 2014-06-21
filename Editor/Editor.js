goog.provide('Editor');

goog.require('goog.dom');
goog.require('goog.editor.Command');
goog.require('goog.editor.SeamlessField');
goog.require('goog.editor.plugins.BasicTextFormatter');
goog.require('goog.editor.plugins.EnterHandler');
goog.require('goog.editor.plugins.RemoveFormatting');
goog.require('goog.editor.plugins.UndoRedo');
goog.require('goog.editor.plugins.ListTabHandler');
//goog.require('goog.editor.plugins.SpacesTabHandler');
goog.require('goog.editor.plugins.HeaderFormatter');
goog.require('goog.editor.plugins.LinkBubble');
goog.require('goog.editor.plugins.LinkDialogPlugin');
goog.require('goog.ui.editor.DefaultToolbar');
goog.require('goog.ui.editor.ToolbarController');

window['Editor'] = goog.editor.SeamlessField;

var p = goog.editor.SeamlessField.prototype;

//p['makeEditable'] = p.makeEditable;	// We always call this, so call this from minified code instead
p['isModified'] = p.isModified;
p['manipulateDom'] = p.manipulateDom;
p['getHtml'] = p.getCleanContents;	// Renamed

// Outside code can call makeEditor('editor', 'toolbar') to switch on a seamless field and make it editable, with plugins enabled.
window['makeEditor'] = function (editorId, toolbarId) {
	var editor = new goog.editor.SeamlessField(editorId);

	// Register plugins
	editor.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
	editor.registerPlugin(new goog.editor.plugins.EnterHandler());
	editor.registerPlugin(new goog.editor.plugins.RemoveFormatting());
	editor.registerPlugin(new goog.editor.plugins.UndoRedo());
	editor.registerPlugin(new goog.editor.plugins.ListTabHandler());
	//editor.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
	editor.registerPlugin(new goog.editor.plugins.HeaderFormatter());
	editor.registerPlugin(new goog.editor.plugins.LinkDialogPlugin());
	editor.registerPlugin(new goog.editor.plugins.LinkBubble());
	
	// Setup Toolbar
	var buttons = [
		goog.editor.Command.BOLD,
		goog.editor.Command.ITALIC,
		goog.editor.Command.UNDERLINE,
		goog.editor.Command.FONT_COLOR,
		goog.editor.Command.BACKGROUND_COLOR,
		goog.editor.Command.FONT_FACE,
		goog.editor.Command.FONT_SIZE,
		goog.editor.Command.LINK,
		goog.editor.Command.UNDO,
		goog.editor.Command.REDO,
		goog.editor.Command.UNORDERED_LIST,
		goog.editor.Command.ORDERED_LIST,
		goog.editor.Command.INDENT,
		goog.editor.Command.OUTDENT,
		//goog.editor.Command.JUSTIFY_LEFT,
		//goog.editor.Command.JUSTIFY_CENTER,
		//goog.editor.Command.JUSTIFY_RIGHT,
		//goog.editor.Command.SUBSCRIPT,
		//goog.editor.Command.SUPERSCRIPT,
		//goog.editor.Command.STRIKE_THROUGH,
		goog.editor.Command.REMOVE_FORMAT
	];

	var toolbar = goog.ui.editor.DefaultToolbar.makeToolbar(buttons, goog.dom.getElement(toolbarId));
	var toolbarController = new goog.ui.editor.ToolbarController(editor, toolbar);

	editor.makeEditable();
	return editor;
};

