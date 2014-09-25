$(document).on('click', 'table thead th.check.all [type="checkbox"]', function(e) {
    var $this = $(this);
    $this.prop('checked', !$this.prop('checked')).closest('table').checkboxes('toggle');
});

$('table').checkboxes('range', true);

$(document).on('click', 'table thead th a', function (e) {
//    e.preventDefault();
//
//    var $this = $(this);
//    $.ajax({
//        url: '',
//        data: {
//            order: $this.data('column')
//        },
//        success: function(html) {
//            $this.closest('table').find('tbody').html(html);
//        }
//    });
//
//    return false;
});

$(document).on('click', '.toolbar .search, .toolbar .exit-search', function(e){
    e.preventDefault();
    $('.toolbar').toggleClass('search');
    $('.page-size').toggleClass('search');
    if ($('.toolbar').hasClass('search')){
        $('.toolbar .search-toolbar input').focus();
    }
    return false;
});

$(document).on('keydown', '.toolbar .search-toolbar input', function(e){
    if (e.keyCode == 13){
        return false;
    }
});

$(document).on('keyup', '.toolbar .search-toolbar input', function(e){
    var searchVar = 'search',
        $this = $(this),
        updateTimer;

    if (e.keyCode == 27){
        $('.toolbar').removeClass('search');
        $('.page-size').removeClass('search');
    }else{
        clearTimeout(updateTimer);
        updateTimer = setTimeout(function(){
            var $list = $('#list');
            var url = $list.data('path');

            url = url.replace(new RegExp("(&|\\?)" + searchVar+"=.*?(&|$)",'g'), function(str, p1, p2, offset, s) {
                if (p1 == '?'){
                    return '?';
                }else if (p2 == ''){
                    return '';
                }
                return '&';
            });

            var data = {};
            data[searchVar] = $this.val();
            $.ajax({
                url: url,
                data: data,
                success: function(html) {
                    $list.replaceWith($(html).find('#list'));
                }
            });
        }, 300);
    }
});
