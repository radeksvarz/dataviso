$(function () {
    $('#slideshow').slideshow();
    $('input, textarea').placeholder();
    $('#contact-form').validate();

    $("#checker-form").submit(function (e) {
        e.preventDefault();

        var query = $(this).find('input').val();
        var data = { "name": "Aplikace", "footer": "data | nazev firmy | ke dni XY", "data": [{ "title": "today", "state": "Lorem ipsum dolor sit amet", "additional": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis convallis mauris eu volutpat.</p><ul><li>In gravida viverra mi</li><li>sit amet finibus elit venenatis id</li><li>Suspendisse potenti</li></ul><p>Nunc euismod, nisl vel ornare tempus, augue mauris finibus ligula, et facilisis felis odio vitae ex. Aenean nec orci ut purus tincidunt varius. Maecenas ipsum arcu, lobortis non justo sit amet, cursus vehicula felis. Suspendisse iaculis metus eu ipsum mattis luctus.</p>", "icon": "supported" }, { "title": "2015–06–13", "state": "not-supported", "icon": "not-supported" }] };
        var errorCaller = {};

        var call = (query == 'error') ? errorCaller : data;

    })

    $(window).on('scroll', function () {
        var asideTopLimit = $('#slideshow').height() + 16 /* 1em (padding) = 16px */
        var position = $(document).scrollTop();
        if (position >= asideTopLimit) {
            $('aside').addClass('sticked');
        } else {
            $('aside').removeClass('sticked');
        }
        if (position > $('#slideshow').height() - $('nav').height()) {
            $('nav').addClass('rolled');
        } else {
            $('nav').removeClass('rolled');
        }
    })
})
