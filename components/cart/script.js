// async function populate() {
//     const request = "./data.json";
//     const data = new Request(request);
//     const response = await fetch(data);
//     const population = await response.json();
//     console.log(population);
//     populatePage(population)
// }

// function populatePage(obj) {
//     const products = document.querySelector(".products")
//     const img = document.createElement('img');
//     console.log(obj);
// }

// populate()


async function populate() {

    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => populatePage(json));


}

function populatePage(obj) {
    // console.log(obj);
    const products = document.querySelector(".products")
    for (let i = 0; i < obj.length; i++) {
        const el = obj[i];
        const singleProduct = document.createElement('div')
        singleProduct.setAttribute('data-id', i)
        singleProduct.classList.add('single_product')
        products.appendChild(singleProduct)
        const imgCont = document.createElement('div')
        const img = document.createElement('img');
        const name = document.createElement('h1')
        const category = document.createElement('h2')
        const price = document.createElement('h3')
        imgCont.classList.add('img_container')
        img.classList.add('product_img')
        img.src = el.image.desktop
        name.innerText = el.name
        category.innerText = el.category
        price.innerText = `$${el.price}`
        singleProduct.appendChild(imgCont)
        imgCont.appendChild(img)
        singleProduct.appendChild(category)
        singleProduct.appendChild(name)
        singleProduct.appendChild(price)
        createAddToCart(imgCont)
    }

    addToCart()
    changeQuantity()
}

populate()

function createAddToCart(imgCont) {
    const addToCartBtn = document.createElement('div')
    const changQuantity = document.createElement('div')
    const quantityNumber = document.createElement('div')
    const cartImg = document.querySelector('.cart_img')
    const increaseImage = document.querySelector('.increment_img')
    const decreaseImage = document.querySelector('.decrement_img')
    addToCartBtn.classList.add('add_to_cart_btn')
    changQuantity.classList.add('change_quantity')
    quantityNumber.classList.add('quantity_number')
    addToCartBtn.innerText = "Add To Cart"
    quantityNumber.innerText = "1"
    // cartImg.src = "./assets/images/icon-add-to-cart.svg"
    increaseImage.src = "./assets/images/icon-increment-quantity.svg"
    decreaseImage.src = "./assets/images/icon-decrement-quantity.svg"
    increaseImage.classList.add('increase_btn')
    decreaseImage.classList.add('decrease_btn')
    imgCont.appendChild(changQuantity)
    imgCont.appendChild(addToCartBtn)
    const addCartBtnClone = cartImg.cloneNode(true)
    const incrementImgClone = increaseImage.cloneNode(true)
    const decrementImgClone = decreaseImage.cloneNode(true)
    addToCartBtn.appendChild(addCartBtnClone)
    changQuantity.appendChild(decrementImgClone)
    changQuantity.appendChild(quantityNumber)
    changQuantity.appendChild(incrementImgClone)
}

function addToCart() {
    localStorage.setItem('price', '')
    let products = document.querySelectorAll('.add_to_cart_btn')
    products.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.img_container').querySelector('.product_img').classList.add('checked')
            let product = el.closest('.single_product')
            let price = product.querySelector('h3').innerText.replace('$', '')
            el.classList.add('hidden')
            if (localStorage.getItem('price') === '') {
                localStorage.setItem('price', price)
            } else {
                const prevPrice = parseFloat(localStorage.getItem('price'));
                localStorage.setItem('price', parseFloat(price) + prevPrice)
            }
        })
    });
}

function changeQuantity() {
    const increaseBtn = document.querySelectorAll('.increase_btn')
    const decreaseBtn = document.querySelectorAll('.decrease_btn')

    increaseBtn.forEach(el => {
        el.addEventListener('click', () => {
            let quantity = parseInt(el.closest('.change_quantity').querySelector('.quantity_number').textContent)
            quantity++
            el.closest('.change_quantity').querySelector('.quantity_number').textContent = quantity

            const price = el.closest('.single_product').querySelector('h3').innerText.replace('$', '')
            const prevPrice = parseFloat(localStorage.getItem('price'));
            localStorage.setItem('price', parseFloat(price) + prevPrice)
        })
    });
    decreaseBtn.forEach(el => {
        el.addEventListener('click', () => {
            let quantity = parseInt(el.closest('.change_quantity').querySelector('.quantity_number').textContent)
            if (quantity > 1) {
                quantity--
                el.closest('.change_quantity').querySelector('.quantity_number').textContent = quantity

                const price = el.closest('.single_product').querySelector('h3').innerText.replace('$', '')
                const prevPrice = parseFloat(localStorage.getItem('price'));
                localStorage.setItem('price', prevPrice - parseFloat(price))
            }

        })
    });

}



