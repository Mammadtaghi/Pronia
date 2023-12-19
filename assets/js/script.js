// Search Icon Function
// HTML Stuff
const magnifyingGlass = document.querySelector('.fa-magnifying-glass')
const modalCloseBtn = document.querySelector('.modalCloseBtn')
const searchModal = document.querySelector('.searchModal')
magnifyingGlass.addEventListener('click', (e) => {
    e.preventDefault()

    // Open Modal
    // searchModal.style.animation = 'modal 0.5s ease-in-out 0s forwards'
    searchModal.style.opacity = '1'
    searchModal.style.top = '0'
    searchModal.style.zIndex = '2'


})


modalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // Close Modal
    // searchModal.style.animation = 'modal 0.5s ease-in-out 0s reverse backwards'
    searchModal.style.opacity = '0'
    searchModal.style.top = '-20%'
    searchModal.style.zIndex = '-1'

})

// Nav animation
// all subNavs
const navItems = document.querySelectorAll('.navItem')
const subNavs = document.querySelectorAll('.subNav')

navItems.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault()

        try {
            element.children[1].classList.toggle('display')
        } catch (error) {
            console.log(error);
        }

    })
});

// sideNav Animation
const sideNav = document.getElementById('sideNav')
const toggleIcon = document.querySelector('.fa-bars')
const xIcon = document.querySelector('.sideNavCloseIcon')
toggleIcon.addEventListener('click', (e) => {
    e.preventDefault()

    sideNav.style.left = '0px'

})

xIcon.addEventListener('click', (e) => {
    e.preventDefault()

    sideNav.style.left = '-350px'

})

// User Icon Dropdown
const users = document.querySelector('.sideUsers')
const usersListDiv = document.querySelector('.usersListDiv')
users.addEventListener('click', (e) => {
    e.preventDefault()

    usersListDiv.classList.toggle('display')

})

// Dropdown Animation
const dropdownsTitle = document.querySelectorAll('.dropdownTitle')
const dropdownsMenu = document.querySelectorAll('.dropdownMenu')

try {
    // Clicking event for every element
    for (const key in dropdownsTitle) {
        dropdownsTitle[key].addEventListener('click', (e) => {
            e.preventDefault()

            dropdownsMenu[key].classList.toggle('maxHeight')
            let dropdowns = []
            Object.values(dropdownsMenu[key].parentElement.parentElement.children).forEach(element => {
                if (element.classList.contains('sideDropdown')) {
                    // console.log(element);
                    dropdowns.push(element)
                }
            })
            // console.log(dropdowns);

            for (const x in dropdowns) {
                if (x !== key) {
                    // console.log(`key: ${key}`);
                    // console.log(`x: ${x}`);
                    const element = dropdowns[x].children[1];
                    element.classList.remove('maxHeight')
                    // console.log(element);

                }
            }

        })
    }
} catch (error) {
    console.log('');
}

// Inner Dropdown Animation (better than Dropdown Animation)
// HTML stuff
const innerMenus = document.querySelectorAll('.innerMenu');
const innerMenusArr = Object.values(innerMenus)
const innerMenuTitles = document.querySelectorAll('.innerMenuTitle')
const innerMenuDropdowns = document.querySelectorAll('.innerDropdownMenu')

// Clicking event for every element
for (const key in innerMenuTitles) {
    try {
        innerMenuTitles[key].addEventListener('click', (e) => {
            e.preventDefault()

            innerMenuDropdowns[key].classList.toggle('maxHeight')

            for (const x in innerMenusArr) {
                if (x !== key) {
                    innerMenus[x].children[1].classList.remove('maxHeight')

                }
            }

        })
    } catch (error) {
        console.log('');
    }
}

// Whishlist Animation
// HTML stuff
const basketBtn = document.querySelector('.fa-basket-shopping')
const wishlistCloseBtn = document.querySelector('.wishlistCloseBtn')
const wishlistMenu = document.querySelector('.wishlist')

// Opening
basketBtn.onclick = () => wishlistMenu.style.right = '0px'

// Closing
wishlistCloseBtn.onclick = () => wishlistMenu.style.right = '-450px'

// Discover Section
const sliderImages = ['assets/images/Plant1.png', 'assets/images/Plant2.png']

// Discover Plant Image Slider
const discoverLeftArrow = document.querySelector('.discoverLeftArrow')
const discoverRightArrow = document.querySelector('.discoverRightArrow')
const discoverSlider = document.querySelector('.discoverSlider')

// Set default image
let index = 1
let lenSlider = sliderImages.length - 1
discoverSlider.setAttribute('src', sliderImages[index])

function changeImgLeft() {
    if (!(index <= 0)) {
        index--
        discoverSlider.setAttribute('src', sliderImages[index])
    }
    else {
        index = lenSlider
        discoverSlider.setAttribute('src', sliderImages[index])

    }
}

function changeImgRight() {
    if (!(index >= lenSlider)) {
        index++
        discoverSlider.setAttribute('src', sliderImages[index])
    }
    else {
        index = 0
        discoverSlider.setAttribute('src', sliderImages[index])

    }
}

// Slide With Interval
function changeImgInTime() {
    let test = setInterval(() => {
        if (!(index >= lenSlider)) {
            index++
            discoverSlider.setAttribute('src', sliderImages[index])

        }
        else {
            index = 0
            discoverSlider.setAttribute('src', sliderImages[index])

        }
    }, 7000)

}

// changeImgInTime()


// Fetch Data
const productItemsDiv = document.querySelector('.productItemsDiv')

async function getDataFromAPI() {

    // Fetch Data from API
    let response = await axios.get('http://localhost:3000/pronia')
    Data = response.data

    productItemsDiv.innerHTML = ''

    // Get product data in place
    Data.forEach(element => {
        let product = document.createElement('div')
        product.innerHTML = `<div class="product" onclick="AddToWishlist(${element.id})">
            <div class="productImgDiv">
                <img src=${element.img} alt="" class="productImg">
            </div>
            <h3 class="productName">${element.name}</h3>
            <span class="productPrice">$${element.price}</span>
        </div>`

        // Then send them to HTML in style
        productItemsDiv.append(product)
    })
}
getDataFromAPI()



const wishlistProductContainer = document.querySelector('.wishlistProductContainer')
// Adding clicked element to wishlist

async function AddToWishlist(postId) {


    let response = await axios.get(`http://localhost:3000/pronia/${postId}`)

    let product = response.data

    // if not added to basket yet
    if (product.count === 0) {
        axios.post(`http://localhost:3000/basket/`, product)
    }

    // If added to basket just increase Count in every click
    product.count++
    axios.put(`http://localhost:3000/pronia/${postId}`, product)
    axios.put(`http://localhost:3000/basket/${postId}`, product)

}

// Create basket element and add it to HTMl
async function AddToBasket() {

    // Fetch Data
    let response = await axios.get(`http://localhost:3000/basket`)

    let products = response.data

    // Reset basket before adding data back
    wishlistProductContainer.innerHTML = ''
    
    products.forEach(element => {
        
        // Get clicked product to wishlist
        let item = document.createElement('div')
        item.classList.add('wishlistProduct')
    
        item.innerHTML = `<img class="wishlistProductImg" src=${element.img}>    
                <div class="wishlistProductTextBox">
                    <div class="headLine">
                        <h3 class="wishlistProductName">${element.name}</h3>
                        <i class="fa-solid fa-xmark closeBtn" onclick="RemoveProduct(${element.id})"></i>
                    </div>
                    <span class="">${element.count} x ${element.price}</span>
                </div>`
    
        wishlistProductContainer.append(item)
    });

}
AddToBasket()

// Subtotal
const subTotal = document.querySelector('.totalPrice')

// Calculating Subtotal
async function CalculateSubTotal() {

    let response = await axios.get(`http://localhost:3000/basket`)

    let products = response.data

    // A variable to store TotalPrice
    let totalPrice = 0

    products.forEach(element => {
        totalPrice +=  +element.price*element.count
    });
    
    subTotal.innerHTML = `$${totalPrice}`

}
CalculateSubTotal()


// Function for Close Button in whislist
async function RemoveProduct(productId) {
    
    let response = await axios.get(`http://localhost:3000/basket/${productId}`)

    let product = response.data

    // If there is more than one just decrease the count and add changes to API
    if (product.count > 1) {
        product.count--
        axios.put(`http://localhost:3000/pronia/${productId}`, product)
        axios.put(`http://localhost:3000/basket/${productId}`, product)
    }
    // But if there is only one then make count 0 delete Item from basketAPI and set the change to proniaAPI
    else{
        product.count--
        axios.put(`http://localhost:3000/pronia/${productId}`, product)
        axios.delete(`http://localhost:3000/basket/${productId}`)
    }

}



