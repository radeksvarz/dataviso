$(function () {
    $('.nav').click(function (e) {
        var reserve = 0;
        var animationTime;
        e.preventDefault();
        if ($($(this).attr('href')).length == 0) return true;
        animationTime = ($('nav ul').hasClass('show')) ? 0 : 300;
        $('nav ul').removeClass('show');
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - reserve }, animationTime);
    })
    $('.menu-button').click(function (e) {
        $('nav ul').addClass('show');
    })
    $('nav .close').click(function (e) {
        $('nav ul').removeClass('show');
    })

    $('a[rel^="fancybox"]').fancybox();
})
