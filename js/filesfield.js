(function ($) {

    "use strict";

    var filesField = function () {
        return filesField.init.apply(this, arguments);
    };

    $.extend(filesField, {
        options: {
            uploadUrl: undefined,
            sortUrl: undefined,
            listId: undefined,
            flowData: {},
            sortData: {}
        },
        element: undefined,
        init: function (element, options) {
            if (element === undefined) return;

            this.element = element;
            this.options = $.extend(this.options, options);

            this.initUploader();
            this.initList();

            return this;
        },
        initUploader: function () {
            var me = this;

            var flow = new Flow({
                target: me.options.uploadUrl,
                query: me.options.flowData
            });

            flow.assignBrowse(this.element);
            flow.assignDrop(this.element);

            flow.on('filesSubmitted', function(){
                flow.upload();
            });

            flow.on('uploadStart', function(){
                $(me.element).find('.progress_bar').css({
                    'width': 0
                });
            });

            flow.on('progress', function(){
                var width = flow.progress() * 100 + '%';
                $(me.element).find('.progress_bar').css({
                    'width': width
                });
            });

            flow.on('complete', function(){
                $(me.element).find('.progress_bar').css({
                    'width': '100%'
                });
                me.updateList();
            });
        },
        updateList: function () {
            var me = this;
            $.ajax({
                'url': window.location.href,
                'dataType': 'html',
                'success': function (data) {
                    var wrapped_data = $('<div/>').append(data);
                    $('#' + me.options.listId).replaceWith(wrapped_data.find('#' + me.options.listId));
                    me.initList();
                }
            });
        },
        initList: function() {
            var me = this;
            $("#" + this.options.listId).dragsort({
                dragSelector: "li",
                placeHolderTemplate: "<li class='empty'></li>",
                dragEnd: function() {
                    me.sort();
                }
            });
        },
        sort: function() {
            var pk = [];
            var me = this;
            $("#" + this.options.listId).find('li').each(function(){
                if ($(this).data('pk')) {
                    pk.push($(this).data('pk'));
                }
            });
            var data = me.options.sortData;
            data['pk'] = pk;

            $.ajax({
                'type': 'post',
                'url': me.options.sortUrl,
                'data': data
            });
        }
    });

    /**
     * Инициализация функции объекта для jQuery
     */
    return $.fn.filesField = function (options) {
        return filesField.init(this, options);
    };

})($);