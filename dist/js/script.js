$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        rtl: true,
        margin: 10,
        center: true,
        dots: false,
        nav: true,
        navText: ["<img src='./img/home/next.png'>", "<img src='./img/home/prev.png'>"],
        responsive: {
            0: {
                items: 1
            },
            540: {
                items: 2,
                center: false,
            },
            992: {
                items: 3
            }
        }
    });

    if ($(window).width() <= 600) {
        $('.two .mob-slider').removeClass('d-flex jc-between').addClass('owl-carousel owl-theme').owlCarousel({
            loop: true,
            rtl: true,
            center: true,
            dots: true,
            items: 1,
            autoHeight: true
        });
    }

    $(document).mouseup(function (e) {
        let classPop = $('.popup').hasClass('active');
        if (classPop) {
            let div = $(".window-pop");
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.popup').removeClass('active');
            }
        }
    });
    $('.popUpBtn').click(function () {
        let className = $(this).data('pop');
        $(`.pop_${className}`).addClass('active');
    });
});