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
}

populate()

function createAddToCart(imgCont) {
    const addToCartBtn = document.createElement('div')
    const changQuantity = document.createElement('div')
    const cartImg = document.createElement('img')
    const addImage = document.createElement('img')
    const removeImage = document.createElement('img')
    addToCartBtn.classList.add('add_to_cart_btn')
    changQuantity.classList.add('change_quantity')
    addToCartBtn.innerText = "Add To Cart"
    changQuantity.innerText = "1"
    cartImg.src = "./assets/images/icon-add-to-cart.svg"
    addImage.src = "./assets/images/icon-increment-quantity.svg"
    removeImage.src = "./assets/images/icon-decrement-quantity.svg"
    imgCont.appendChild(changQuantity)
    imgCont.appendChild(addToCartBtn)

    addToCartBtn.appendChild(cartImg)
    changQuantity.appendChild(addImage)
    changQuantity.appendChild(removeImage)
}

function addToCart() {
    localStorage.setItem('price', '')
    let products = document.querySelectorAll('.add_to_cart_btn')
    products.forEach(el => {
        el.addEventListener('click', () => {
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

}



