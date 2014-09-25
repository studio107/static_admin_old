(function() {
    tinymce.create('tinymce.plugins.audio', {
        init : function(ed, url) {
	    
            ed.addButton('audio', {
                title : 'audio',
                 cmd : 'audioFile',
                image : url + '/musicstore.png'
            });

			ed.addCommand('audioFile', function() {
				ed.windowManager.open({
					file : url + '/fdialog.htm',
					width : 320,
					height : 150,
					inline : 1
				}, {
					plugin_url : url
				});
			});
        },
        createControl : function(n, cm) {
            return null;
        }
    });
    tinymce.PluginManager.add('audio', tinymce.plugins.audio);
})();