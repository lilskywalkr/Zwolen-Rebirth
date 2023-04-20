$(document).ready(function () {

    // parallax effect 
    {
        $('.top-background').paroller();
        $('.parallax-image').paroller();
    }

    // clicking on bars button
    {
        $('.bars span').click(function () {
            $('.dropdown-menu').slideToggle(600);
            $('.dropdown-menu').css('display', 'flex');
        });
    }

    {
        // smooth scrolling

        $('a[href^="#"]').on('click', function (event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1500);
            }
        });
    }

    // animations

    {
        ScrollReveal().reveal('.animate-1', {
            scale: 0.5
        });
        ScrollReveal().reveal('.animate-2', {
            scale: 0.5,
            delay: 200
        });
        ScrollReveal().reveal('.animate-3', {
            scale: 0.5,
            delay: 400
        });
        ScrollReveal().reveal('.animate-4', {
            scale: 0.5,
            delay: 500
        });
        ScrollReveal().reveal('.animate-5', {
            scale: 0.5,
            delay: 600
        });
        ScrollReveal().reveal('.animate-6', {
            scale: 0.5,
            delay: 700
        });
        ScrollReveal().reveal('.animate-7', {
            scale: 0.5
        });
        ScrollReveal().reveal('.animate-8', {
            scale: 0.5,
            delay: 200
        });
    }

});
