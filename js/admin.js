$(function () {
    $(document).foundation();
    $('textarea').autosize();

    $(document).on('click', '.action-delete', function(e) {
        if(confirm('Please confirm action')) {
            return e;
        } else {
            e.preventDefault();
            return false;
        }
    });

    $(document).on('click', "[data-toggle]", function() {
        $(this).next().toggle();
    });

    $(document).on('click', '.mmodal', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.mmodal({
            width: $this.data('width')
        });
        return false;
    });

    var selector = '',
        types = ['jpg', 'jpeg', 'png', 'gif'];
    for (var i = 0; i < types.length; i++) {
        selector += "a[href$='." + types[i].toLowerCase() + "'],a[href$='." + types[i].toUpperCase() + "']";
        if(i+1 != types.length) {
            selector += ",";
        }
    }
    var $linkWithImage = $(selector);
    $linkWithImage
        .attr('rel', 'fancybox')
        .fancybox({
            openEffect: 'elastic',
            closeEffect: 'elastic',
            helpers: {
                title: {
                    type: 'inside'
                },
                buttons: {}
            }
        });

    $.mtooltip('[rel~=tooltip]');

    $(document).on('click', '.flash-list .close', function(e) {
        e.preventDefault();
        $('.tooltip').fadeOut();
        $(this).parent().fadeOut();
        return false;
    });
});
