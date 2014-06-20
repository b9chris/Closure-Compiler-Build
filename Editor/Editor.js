goog.provide('Editor');

goog.require('goog.editor.Command');
goog.require('goog.editor.SeamlessField');
goog.require('goog.editor.plugins.BasicTextFormatter');
goog.require('goog.editor.plugins.EnterHandler');

window['Editor'] = goog.editor.SeamlessField;

var p = goog.editor.SeamlessField.prototype;

//p['makeEditable'] = p.makeEditable;	// We always call this, so call this from minified code instead
p['isModified'] = p.isModified;
p['manipulateDom'] = p.manipulateDom;
p['getHtml'] = p.getCleanContents;	// Renamed

// Outside code can call makeEditor('editor') to switch on a seamless field and make it editable, with plugins enabled.
window['makeEditor'] = function (id) {
	var editor = new goog.editor.SeamlessField(id);
	editor.makeEditable();

	editor.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
	editor.registerPlugin(new goog.editor.plugins.EnterHandler());

	return editor;
};

