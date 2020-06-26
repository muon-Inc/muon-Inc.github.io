$(document).ready(function () {
    $('#nav-icon1').on('click', function () {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click', function () {
        $('#nav-icon1').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    $('nav a[href*="#"]').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000);
    });

    $('a[href*="#about"]').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000);
    });

    $('#up').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });
    
        $('#gform').on('submit', function (e) {

        //Show Alert
        document.querySelector('.alert').style.display = "block";
        //Hide alert after 4 sec
        setTimeout(function () {
            document.querySelector('.alert').style.display = "none";
        }, 4000);

    });

    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: false
    });
});

$(window).ready(function () {

    var wHeight = $(window).height();

    $('.part')
        // .height(wHeight)
        .scrollie({
            scrollOffset: -400,
            scrollingInView: function (elem) {

                var bgColor = elem.data('background');

                $('body').css('background-color', bgColor);

            }
        });
});
