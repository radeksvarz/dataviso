(function ($) {
    var height = 0.85;
    var intervalTime = 7000;
    var animationTime = 200;

    var slidesCount;
    var currentSlide = -1;
    var elem;
    var interval;

    $.fn.slideshow = function () {
        elem = this
        slidesCount = elem.find('.slide').length
        createNav();
        setSlide(0, 0);
        size();
        elem.find('.slide').cover();

        interval = setInterval(function () {
            setSlide(nextSlide(), animationTime);
        }, intervalTime);

        elem.find('#nav li').on('click', function (e) {
            setSlide($(this).index(), animationTime);
            clearInterval(interval);
            interval = setInterval(function () {
                setSlide(nextSlide(), animationTime);
            }, intervalTime);
        })

        $(window).resize(function () {
            size();
            elem.find('#container').css({ left: -(currentSlide * $(window).width()) })
        })
    }

    function size() {
        elem.height($(window).height() * height);
        elem.find('#container').width($(window).width() * slidesCount);
        elem.find('.slide').width($(window).width());
    }

    function createNav() {
        for (var i = 0; i < slidesCount; i++) {
            elem.find('#nav').append('<li>&nbsp;</li>');
        }
    }

    function setSlide(idx, time) {
        if (idx == currentSlide) {
            return true;
        }
        elem.find('#nav li').removeClass('current');
        elem.find('#nav li').eq(idx).addClass('current');

        var slide = elem.find('.slide').eq(currentSlide);
        var nextSlide = elem.find('.slide').eq(idx);
/*
        if (nextSlide.hasClass('white')) {
            $('#nav').addClass('white');
        } else {
            $('#nav').removeClass('white');
        }
*/
        slide.find('.text').fadeOut(time, function () {
            elem.find('#container').animate({ left: -(idx * $(window).width()) }, 2 * time, function () {
                nextSlide.find('.text').fadeIn(time, function () {
                    currentSlide = idx;
                })
            });
        })
    }

    function nextSlide() {
        var next = currentSlide + 1;
        while (next >= slidesCount) {
            next -= slidesCount;
        }
        return next;
    }
}(jQuery));

(function ($) {
    $.fn.cover = function () {
        return this.each(function () {
            var self = $(this);
            size(self);

            $(window).resize(function () {
                size(self);
            })

        })

        function size(elem) {
            var image = elem.find('img'),
                imageAspect = image.attr('width') / image.attr('height'),
                containerAspect = elem.width() / elem.height();

            if (imageAspect > containerAspect) {
                image.css({
                    width: elem.height() * imageAspect,
                    height: elem.height(),
                    left: -Math.round(((elem.height() * imageAspect) - elem.width()) / 2),
                    top: 0
                });
            } else {
                image.css({
                    width: elem.width(),
                    height: elem.width() / imageAspect,
                    left: 0,
                    //top: -Math.round(((elem.width() / imageAspect) - elem.height()) / 2)
                    bottom: 0
                });
            }
        }
    }
}(jQuery));