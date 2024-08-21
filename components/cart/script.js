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
    // increaseImage.src = "./assets/images/icon-increment-quantity.svg"
    // decreaseImage.src = "./assets/images/icon-decrement-quantity.svg"
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
    localStorage.setItem('productsCounter', 0)
    localStorage.setItem('cartEmpty', true)
    let products = document.querySelectorAll('.add_to_cart_btn')
    isCartEmpty()
    products.forEach(el => {
        el.addEventListener('click', () => {
            el.closest('.img_container').querySelector('.product_img').classList.add('checked')
            let product = el.closest('.single_product')
            let price = product.querySelector('h3').innerText.replace('$', '')
            let counter = parseInt(localStorage.getItem('productsCounter'))
            localStorage.setItem('productsCounter', ++counter)
            el.classList.add('hidden')
            localStorage.setItem('cartEmpty', false)
            isCartEmpty()

            if (localStorage.getItem('price') === '') {
                localStorage.setItem('price', price)
            } else {
                const prevPrice = parseFloat(localStorage.getItem('price'));
                localStorage.setItem('price', parseFloat(price) + prevPrice)
            }

            updateCart()
            addProdToCart(el)
        })
    });
}

function isCartEmpty() {
    const emptyCartVal = localStorage.getItem('cartEmpty')
    const cartThumbnail = document.querySelector('.empty_cart')
    const cart = document.querySelector('.products_cart_cont')
    if (emptyCartVal === 'true') {
        cartThumbnail.classList.remove('hidden');
        cart.classList.add('hidden');
    } else {
        cartThumbnail.classList.add('hidden');
        cart.classList.remove('hidden');
    }
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

            updateCart()
            changeCartQuantity(el)

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
            } else if (quantity === 1) {
                quantity = 0
                el.closest('.change_quantity').querySelector('.quantity_number').textContent = quantity
                const price = el.closest('.single_product').querySelector('h3').innerText.replace('$', '')
                const prevPrice = parseFloat(localStorage.getItem('price'));
                localStorage.setItem('price', prevPrice - parseFloat(price))
            }

            updateCart()
            changeCartQuantity(el)
        })

    });



}

function updateCart() {
    let cartPrice = document.querySelector('.cart_summary_price')
    cartPrice.textContent = `$${localStorage.getItem('price')}`

    let cartTitleCounter = document.querySelector('.cart_title span')
    cartTitleCounter.textContent = localStorage.getItem('productsCounter')
}

function addProdToCart(obj) {

    let prodTitle = obj.closest('.single_product').querySelector('h1').textContent
    let prodPrice = obj.closest('.single_product').querySelector('h3').textContent.replace('$', '')
    let prodId = obj.closest('.single_product').getAttribute('data-id')

    let prodQuantity = obj.closest('.single_product').querySelector('.quantity_number').textContent
    let prodFullPrice = parseFloat(prodPrice) * parseFloat(prodQuantity)

    const cont = document.querySelector('.cart_content')
    const quantity = document.createElement('div');
    const singlePrice = document.createElement('div');
    const fullPrice = document.createElement('div')
    const singleProd = document.createElement('div')
    const cartProdTitle = document.createElement('div')
    const cartRight = document.createElement('div')
    const cartLeft = document.createElement('div')
    const quantityPrice = document.createElement('div')
    const removeIcon = document.querySelector('.remove_icon')
    const removeIconClone = removeIcon.cloneNode(true)
    singleProd.classList.add('cart_product')
    quantity.classList.add('cart_quantity')
    singlePrice.classList.add('cart_single_price')
    fullPrice.classList.add('cart_full_price')
    cartLeft.classList.add('cart_left_side')
    cartRight.classList.add('cart_right_side')
    quantityPrice.classList.add('quantity_price')
    cartProdTitle.classList.add('cart_prod_title')
    cartProdTitle.textContent = prodTitle
    singleProd.setAttribute('data-id', prodId)


    cont.appendChild(singleProd)
    singleProd.appendChild(cartLeft)
    singleProd.appendChild(cartRight)
    cartLeft.appendChild(cartProdTitle)
    cartLeft.appendChild(quantityPrice)
    quantityPrice.appendChild(quantity)
    quantityPrice.appendChild(singlePrice)
    quantityPrice.appendChild(fullPrice)
    quantity.textContent = `${prodQuantity}x`
    singlePrice.textContent = `$${prodPrice}`
    fullPrice.textContent = `$${prodFullPrice}`
    cartRight.appendChild(removeIconClone)

    removeIconClone.addEventListener('click', () => {
        const product = event.target.closest('.cart_product');
        cartPrice = parseFloat(localStorage.getItem('price'))
        newPrice = cartPrice - parseFloat(product.querySelector('.cart_full_price').textContent.replace('$', ''))
        localStorage.setItem('price', newPrice)
        product.remove()
        let counter = parseInt(localStorage.getItem('productsCounter'))
        localStorage.setItem('productsCounter', --counter)
        if (counter === 0) {
            localStorage.setItem('cartEmpty', true)
            isCartEmpty()
        }


        const prodId = product.getAttribute('data-id')
        const allProducts = document.querySelectorAll('.single_product')
        allProducts.forEach(el => {
            if (el.getAttribute('data-id') === prodId) {
                el.querySelector('.quantity_number').textContent = '1'
                el.querySelector('.add_to_cart_btn').classList.remove('hidden')
            }
        });
        updateCart()

    })

}

function changeCartQuantity(obj) {
    const changedQuantity = parseInt(obj.closest('.change_quantity').querySelector('.quantity_number').textContent);
    const prodId = obj.closest('.single_product').getAttribute('data-id')
    const products = document.querySelectorAll('.cart_product')
    products.forEach(el => {
        if (prodId === el.getAttribute('data-id')) {
            el.querySelector('.cart_quantity').textContent = `${changedQuantity}x`
            const price = parseFloat(el.querySelector('.cart_single_price').textContent.replace('$', ''))
            el.querySelector('.cart_full_price').textContent = `$${price * changedQuantity}`
        }

    });

}




