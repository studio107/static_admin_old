if (!Date.now) {
    Date.now = function() {
        return new Date().getTime();
    };
}

$(document).on('click', '.inline-add', function(e) {
    e.preventDefault();

    var $this = $(this),
        $container = $this.closest('.inline-form');

    var id = $this.data('id'),
        cloneIndex = $container.children('section').length,
        $source = $this.prev(),
        name = $(this).data('name'),
        regex = /^(.*)[(\d)](.*)+$/i;

    if($source.length > 1) {
        return;
    }

    var $clone = $source.clone();
    $clone.addClass('form-inline-section').attr({
        id: id.slice(0, -1) + cloneIndex + '-container'
    });

    $clone.find('.actions input').attr({
        value: null,
        disabled: 'disabled'
    });

    $clone
        .find('input, button, textarea, select, label').each(function(i, element) {
            var $el = $(element),
                name = $el.attr('name'),
                id = $el.attr('id'),
                forAttr = $el.attr('for');

            if(name && id) {
                var nameData = name.match(regex),
                    idData = id.match(regex);

                if(nameData && idData) {
                    $el.attr({
                        id: idData[1] + cloneIndex + idData[2],
                        name: nameData[1] + cloneIndex + nameData[2],
                        value: null,
                        checked: null
                    });
                }
            }

            if(forAttr) {
                var forData = forAttr.match(regex);
                if(forData) {
                    $el.attr({
                        'for': forData[1] + cloneIndex + forData[2]
                    });
                }
            }
        });

    $clone.find('.current-file-container').remove();
    $clone.find('.form-inline-delete').show();
    $clone.insertBefore($this);

    if($this.data('max') >= $('.form-inline-section').length) {
        $this.hide();
    }

    return false;
});

$(document).on('click', '.form-inline-delete', function(e) {
    e.preventDefault();
    var $target = $(this).closest('.form-inline-section'),
        $addInlineButton = $('.inline-add');
    $target.fadeOut(function() {
        $target.remove();
        if($addInlineButton.data('max') > $('.form-inline-section').length) {
            $addInlineButton.show();
        }
    });
    return false;
});