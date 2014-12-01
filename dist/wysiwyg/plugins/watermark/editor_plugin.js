(function() {
	tinymce.create('tinymce.plugins.watermarkPlugin', {
		init : function(ed, url) {
			ed.addButton('watermark', {
				title : 'Watermark Insert',
				cmd : 'watermark',
				image : url + '/img.gif'
			});
			ed.addCommand('watermark', function() {
				tinyMCE.activeEditor.execCommand('mceReplaceContent',false,'<span class="'+ new Date +'" style="z-index: -100; position:absolute; top: -1234567px; left: -1234567px"><!-- сайт источник '+window.location.protocol+'//'+window.location.hostname+' '+new Date+' --><a rel="home" title="'+window.location.protocol+'//'+window.location.hostname+'" href="'+window.location.protocol+'//'+window.location.hostname+'">Сайт источник: '+window.location.protocol+'//'+window.location.hostname+'</a> '+new Date+'</span>');
			});
		},
		createControl : function(n, cm) {
			return null;
		}
	});
	tinymce.PluginManager.add('watermark', tinymce.plugins.watermarkPlugin);
})();
