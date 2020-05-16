// function to select the elements
const selectElement = (element) => document.querySelector(element);

selectElement('.hamburger').addEventListener('click', () => {
    selectElement('.hamburger').classList.toggle('active');
    selectElement('.nav-list').classList.toggle('active');
});


TweenMax.to(".loading-screen", 4, {
    delay: 3,
    top: "-110vh",
    ease: Expo.easeInOut
});

TweenMax.from(".navbar-brand", 3, {
    delay: 3.4,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
});


TweenMax.from(".hamburger", 3, {
    delay: 3.4,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
});

TweenMax.staggerFrom(".media ul li", 2, {
    delay: 3.7,
    opacity: 0,
    y: 20,
    ease: Power3.easeInOut
}, 0.1);

TweenMax.from(".p1", 3, {
    delay: 4,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
});

TweenMax.from(".p2", 3, {
    delay: 4.2,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
});

TweenMax.from("#hire", 3, {
    delay: 4,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
});

var t1 = new TimelineMax();

t1.from(".ringOne", 4, {
    delay: 0.4,
    opacity: 0,
    y: 40,
    ease: Expo.easeInOut
}).from(".ringTwo", 4, {
    delay: 0.9,
    opacity: 0,
    y: 40,
    ease: Expo.easeInOut
}, "-=5").to(".ringOne", 4, {
    delay: 0.4,
    x: 40,
    ease: Expo.easeInOut
}).to(".ringTwo", 4, {
    delay: 0.9,
    x: 40,
    ease: Expo.easeInOut
}, "-=5")

$('.media ul li a').on('click', function (event) {
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
});

$(window).on('scroll', function () {
    $('.fwh-slide').each(function () {
        if ($(window).scrollTop() >= $(this).offset().top - $(".nav").height()) {
            var id = $(this).attr('id');
            $('.nav li a').removeClass('active');
            $('.nav li a[href="#' + id + '"]').addClass('active');
        }
    });
});

var textWrapper = document.querySelector('.mu .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.mu .letter',
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 750,
        easing: "easeOutExpo",
        delay: function (el, i) {
            return 6000 + 50 * i;
        }
    });

$('nav a[href*="#"]').on('click', function () {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 100
    }, 2000);
});

$('#up').on('click', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 2000);
});
