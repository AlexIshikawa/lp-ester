// Inicialização do Swiper para testimonials
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        loop: true,
        loopAdditionalSlides: 1,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 300,
        grabCursor: true,
        centeredSlides: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        breakpoints: {
            768: {
                spaceBetween: 40,
            }
        }
    });
    

});
