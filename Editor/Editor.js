goog.provide('Editor');

goog.require('goog.editor.SeamlessField');

window['Editor'] = goog.editor.SeamlessField;

var p = goog.editor.SeamlessField.prototype;

p['makeEditable'] = p.makeEditable;
p['isModified'] = p.isModified;
p['manipulateDom'] = p.manipulateDom;
p['getHtml'] = p.getCleanContents;	// Renamed
