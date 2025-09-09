// Hero Slider with Text Changes
document.addEventListener('DOMContentLoaded', function() {
    // Hero banner swiper initialization
    var heroSwiper = new Swiper("#mainVisual .main_bnr", {
        loop: true,
        speed: 1000,
        effect: 'fade',
        slidesPerView: "1",
        slideActiveClass: 'on',
        spaceBetween: 0,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#mainVisual .pager',
            bulletActiveClass: 'on',
            clickable: true
        },
        on: {
            slideChange: function () {
                // Get current slide index
                var activeIndex = this.realIndex;
                
                // Hide all text slides
                var textSlides = document.querySelectorAll('#mainVisual .slide-text');
                textSlides.forEach(function(slide) {
                    slide.classList.remove('active');
                });
                
                // Show current text slide
                var currentTextSlide = document.querySelector('#mainVisual .slide-text[data-slide="' + activeIndex + '"]');
                if (currentTextSlide) {
                    currentTextSlide.classList.add('active');
                }
            }
        }
    });
});