$(function () {
    $(document).foundation();
    $('textarea').autosize();

    //$(document).on('click', "[data-toggle]", function () {
    //    $(this).next().toggle();
    //});

    var selector = '',
        types = ['jpg', 'jpeg', 'png', 'gif'];
    for (var i = 0; i < types.length; i++) {
        selector += "a[href$='." + types[i].toLowerCase() + "'],a[href$='." + types[i].toUpperCase() + "']";
        if (i + 1 != types.length) {
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

    if ($.cookie('sidebar-visible')) {
        $('#sidebar').toggle();
        $('#hide-sidebar').toggleClass('show');
        $('body').addClass('open-menu');
        $('form.save-update .buttons-block').css('left', 0);
    }
});

$(document).on('click', '.mmodal', function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.mmodal({
        width: $this.data('width')
    });
    return false;
});

$(document).on('click', '#hide-sidebar', function (e) {
    e.preventDefault();
    var $this = $(this);
    $('#sidebar').toggle();
    $this.toggleClass('show');
    if ($this.hasClass('show')) {
        $('form.save-update .buttons-block').css('left', 0);
        $('body').removeClass('open-menu');
        $.cookie('sidebar-visible', true);
    } else {
        $('form.save-update .buttons-block').css('left', '250px');
        $('body').addClass('open-menu');
        $.removeCookie('sidebar-visible');
    }
    return false;
});

$(document).on('click', '.flash-list .close', function (e) {
    e.preventDefault();
    $('.tooltip').fadeOut();
    $(this).parent().fadeOut();
    return false;
});

function popupWindow(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2),
        top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

$(document).on('click', '.window-open', function (e) {
    e.preventDefault();
    var $this = $(this);
    popupWindow($this.attr('href'), $this.attr('title'), ($this.data('width') || 650), ($this.data('height') || 650)).print();
    return false;
});

$(document).on('click', '[data-confirm]', function (e) {
    return confirm($(this).data('confirm'));
});