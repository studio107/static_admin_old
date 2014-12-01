var ocAudioDialog = {
	init : function(ed) {
		tinyMCEPopup.resizeToInnerSize();
	},

	insert : function(file, name) {
		var ed = tinyMCEPopup.editor, dom = ed.dom;

		tinyMCEPopup.execCommand('mceInsertContent', false, '\
		<embed width="290" height="24" wmode="transparent" type="application/x-shockwave-flash" src="http://' + window.location.host + '/public/mp3/uid/singlePlayer.swf?soundfile=http://' + window.location.host + '/public/mp3/uid/' + file + '&amp;titles="' + name + '"&amp;artists=""&amp;autostart=no&amp;loop=no" class=" __noscriptObjectPatchMe__">\
		  '
		);

		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(ocAudioDialog.init, ocAudioDialog);
 
