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
});