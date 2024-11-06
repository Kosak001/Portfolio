let menuBtn = document.querySelector(".menu_btn");
let menu = document.querySelector(".menu");



menuBtn.addEventListener("click", () => {
   menu.classList.toggle("active");
   menuBtn.classList.toggle("active");
});

nav = document.querySelector(".nav");

window.addEventListener('scroll', function () {
   if (window.scrollY > 100) {
      nav.classList.add('nav_active');
   } else {
      nav.classList.remove('nav_active');
   }
})


// let loader = document.querySelector('.preloader');
// window.addEventListener('load', () => {
//    setTimeout(() => {
//       loader.classList.add('hide');

//    }, 1000);
// })

let squareBgc1 = document.querySelector('.square_bgc_1')
let firstRot = 40;
setInterval(() => {
   squareBgc1.style.transform = `rotate(${firstRot}deg)`;
   firstRot++;
}, 100);
let squareBgc2 = document.querySelector('.square_bgc_2')
let secondRot = 55;
setInterval(() => {
   squareBgc2.style.transform = `rotate(${secondRot}deg)`;
   secondRot--;
}, 100);




