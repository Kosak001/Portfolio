let images = document.querySelectorAll('.single_card');
let container = document.querySelector('.cards_container')
let attemptsCount = document.querySelector('.attempts span')
let foundedCount = document.querySelector('.founded span')
let restart = document.querySelector('.shuffle')
let count = 0
let counterAll = 0
let counterFound = 0
let dataArray = []

let shuffledImages = Array.from(images)
shuffle(shuffledImages);
shuffledImages.forEach(img => {
    container.append(img)
})

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * array.length)
        currentIndex -= 1

        let temp = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temp
    }

    return array;
}
images.forEach(img => {

    img.addEventListener('click', () => {
        img.classList.add('rotate')
        count++;
        let data = img.getAttribute('data-id')
        dataArray.push(data)


        setTimeout(() => {
            if (count == 2) {

                if (dataArray[0] === dataArray[1]) {
                    console.log(dataArray);
                    let found = document.querySelectorAll('.rotate')
                    found.forEach(img => {
                        img.classList.add('found')
                    })
                    dataArray = []
                    count = 0
                    counterFound++

                    foundedCount.innerHTML = counterFound
                }
                else {
                    dataArray = []
                    images.forEach(img => {

                        img.classList.remove('rotate')
                        count = 0

                    })
                }
                counterAll++;
                attemptsCount.innerHTML = counterAll
            }
        }, 300);


    })


})

restart.addEventListener('click', () => {
    location.reload();
})