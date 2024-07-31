const images = document.querySelectorAll('.gallery_container img');
const ModalCont = document.querySelector('.modal_container')
const swiperCont = document.querySelector('.modal_container .swiper-wrapper')

images.forEach((img, index) => {
    img.addEventListener('click', () => {

        copyImages();
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            centeredSlides: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,

                },
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,

                }
            }
        });

        swiper.slideTo(index, 1000, false)
    })
});
let executed = false;

function copyImages() {
    if (!executed) {
        executed = true;
        images.forEach(img => {
            let images = img.cloneNode(true)
            let slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            swiperCont.appendChild(slide)
            slide.appendChild(images)
        })
    }
    ModalCont.classList.add('visible')
}

let closeModal = document.querySelector('.close_icon');
closeModal.addEventListener('click', (() => {
    ModalCont.classList.remove('visible')
}))


