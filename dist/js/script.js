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
            600: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

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