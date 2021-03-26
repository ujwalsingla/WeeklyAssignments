const wholesalersDropdown = document.querySelector('#wholesalers');
const outletsDropdown = document.querySelector('#outlets');
const categoriesDiv = document.querySelector('.catogeries');
const productsContainer = document.querySelector('.card-container');

const getLoginData = localStorage.getItem('userData');
const parseLoginData = JSON.parse(getLoginData);

const initaialDataUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData';
const userUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/user';
const wholesalersUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/whs/v2';
const outletsUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/outlets/v2';
const categoriesUrl = 'https://netco-indo-test.nfrnds.net:20003/fmcg-dd/catalog?whsId=';
const categoriesPreImgUrl = 'https://res.cloudinary.com/nfrnds/image/upload/fmcgdd';

let productsCatalog = [];
let categories = [];


const wholesalersHandler = (res) => {
    Array.from(wholesalersDropdown.children).forEach(ele => ele.remove());

    res.organizations.forEach(organization => {
        const option = document.createElement('option');
        option.innerText = organization.orgName;
        option.value = organization.orgId;
        wholesalersDropdown.add(option);
    })

    fetchOutlets(wholesalersDropdown.value);
    fetchCategories(wholesalersDropdown.value);
}

$.ajax({
    type: 'GET',
    url: wholesalersUrl,
    headers: {
        'Netco-JWT': parseLoginData.token
    },
    success: wholesalersHandler,
    error: function (request, textStatus, errorThrown) {
        if (request.status == 403) console.log('unAuthorized!');
        else if (request.status == 404) console.log(request.responseJSON.error);
        else if (request.status == 0) console.log('Failed');
        else console.log(request);
        console.log(textStatus)
    }
})

const outletsHandler = (res, whsId) => {
    Array.from(outletsDropdown.children).forEach(ele => ele.remove());

    res.organizations.forEach(organization => {
        organization.whs.forEach(obj => {
            if (obj.whsOrgId == whsId) {
                const option = document.createElement('option');
                option.innerText = organization.orgName;
                option.value = organization.orgId;
                outletsDropdown.add(option);
            }
        })
    })
}

const fetchOutlets = (whsId) => {
    $.ajax({
        type: 'GET',
        url: outletsUrl,
        headers: {
            'Netco-JWT': parseLoginData.token
        },
        success: (res) => outletsHandler(res, whsId),
        error: function (request, textStatus, errorThrown) {
            if (request.status == 403) console.log('unAuthorized!');
            else if (request.status == 404) console.log(request.responseJSON.error);
            else if (request.status == 0) console.log('Failed');
            else console.log(request);
            console.log(textStatus);
        }
    })
}

const productsHandler = (whsId) => {
    const categoriesChildElements = document.querySelectorAll('.container');

    categoriesChildElements[0].classList.add('active');

    categoriesChildElements.forEach(container => {
        container.addEventListener('click', () => {
            const requiredDataString = localStorage.getItem('requiredData')
            let requiredData = JSON.parse(requiredDataString)
            if (!requiredDataString) requiredData = []

            Array.from(categoriesChildElements).forEach(ele => ele.classList.remove('active'));
            container.classList.add('active');

            Array.from(productsContainer.children).forEach(ele => ele.remove());

            const activeCategory = categories.find(obj => {
                return obj.productCategoryId == container.id;
            })

            activeCategory.productIds.forEach(id => {
                const productDetails = productsCatalog.find(obj => {
                    return obj.productId == id;
                })

                const productPriceObj = productDetails.priceList.find(obj => obj.is_default === 'Y');
                const productPrice = productPriceObj.list_price;
                const forProductQuantity = requiredData.find(obj => obj.whsId == whsId && obj.categoryId == container.id && obj.productId == productDetails.productId)
                const productQuantity = forProductQuantity ? forProductQuantity.quantity : 0

                const div = document.createElement('div');
                const imgWrapperDiv = document.createElement('div');
                const img = document.createElement('img');
                const infoDiv = document.createElement('div');
                const infoh2 = document.createElement('h2');
                const infoh3 = document.createElement('h3');
                const btnWrapperDiv = document.createElement('div');
                const plusBtn = document.createElement('button');
                const subBtn = document.createElement('button');
                const outputBtn = document.createElement('button');

                div.classList.add('card');
                imgWrapperDiv.classList.add('img-wrapper')
                infoDiv.classList.add('info');
                plusBtn.classList.add('add');
                subBtn.classList.add('sub');
                outputBtn.classList.add('output');
                btnWrapperDiv.classList.add('btn-wrapper');

                div.id = productDetails.productId;
                productDetails.smallImgUrl ?
                    img.src = categoriesPreImgUrl + productDetails.smallImgUrl :
                    img.src = 'images/logo.png';
                infoh2.innerText = productDetails.productName;
                infoh3.innerText = productPrice + '$';
                plusBtn.innerText = '+';
                plusBtn.addEventListener('click', function () { handleQuantity.call(this, 'plus') })
                subBtn.innerText = '-';
                subBtn.addEventListener('click', function () { handleQuantity.call(this, 'sub') })
                outputBtn.innerText = productQuantity;

                imgWrapperDiv.appendChild(img)
                infoDiv.appendChild(infoh2);
                infoDiv.appendChild(infoh3);

                btnWrapperDiv.appendChild(subBtn);
                btnWrapperDiv.appendChild(outputBtn);
                btnWrapperDiv.appendChild(plusBtn);

                div.appendChild(imgWrapperDiv);
                div.appendChild(infoDiv);
                div.appendChild(btnWrapperDiv);
                productsContainer.appendChild(div);

                if (!forProductQuantity) {
                    if (requiredData.length > 0) {
                        requiredData.every(data => {
                            if (data.whsId == whsId &&
                                data.categoryId == activeCategory.productCategoryId &&
                                data.productId == productDetails.productId) {
                                return false;
                            }
                            requiredData.push({
                                whsId: whsId,
                                categoryId: activeCategory.productCategoryId,
                                categoryName: activeCategory.categoryName,
                                imgUrl: activeCategory.imgUrl,
                                productId: productDetails.productId,
                                productName: productDetails.productName,
                                smallImgUrl: productDetails.smallImgUrl,
                                quantity: productQuantity,
                                price: productPrice
                            })
                            return false;
                        })
                    } else {
                        requiredData.push({
                            whsId: whsId,
                            categoryId: activeCategory.productCategoryId,
                            categoryName: activeCategory.categoryName,
                            imgUrl: activeCategory.imgUrl,
                            productId: productDetails.productId,
                            productName: productDetails.productName,
                            smallImgUrl: productDetails.smallImgUrl,
                            quantity: productQuantity,
                            price: productPrice
                        })
                    }
                }
            })
            localStorage.setItem('requiredData', JSON.stringify(requiredData))
        })
    })
    categoriesChildElements[0].click();
}

const categoriesHandler = (res, whsId) => {
    productsCatalog = res.products;

    Array.from(categoriesDiv.children).forEach(ele => ele.remove());

    res.categories.forEach(obj => {

        if (obj.productCategoryId > 0) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const p = document.createElement('p');

            div.classList.add('container');

            div.id = obj.productCategoryId;
            img.src = categoriesPreImgUrl + obj.imgUrl;
            p.innerText = obj.categoryName;

            div.appendChild(img);
            div.appendChild(p);
            categoriesDiv.appendChild(div);
            categories.push(obj);
        }
    })
    setScroll()
    productsHandler(whsId);
}

const fetchCategories = (whsId) => {
    categories = [];
    $.ajax({
        type: 'get',
        url: categoriesUrl + whsId,
        headers: {
            'Netco-JWT': parseLoginData.token
        },
        success: (res) => categoriesHandler(res, whsId),
        error: function (request, textStatus, errorThrown) {
            if (request.status == 403) console.log('unAuthorized!');
            else if (request.status == 404) console.log(request.responseJSON.error);
            else if (request.status == 0) console.log('Failed');
            else console.log(request);
            console.log(textStatus);
        }
    })
}

wholesalersDropdown.addEventListener('change', (e) => {
    fetchOutlets(e.target.value);
    fetchCategories(e.target.value);
})

const catogeriesDivForScroll = document.querySelector('.catogeries')

const setScroll = () => {
    if(catogeriesDivForScroll.childElementCount * 100 >= window.innerWidth){
        catogeriesDivForScroll.style['overflow-x'] = 'scroll'
    }else{
        catogeriesDivForScroll.style['overflow-x'] = ''
    }
}

function handleQuantity(btnType) {
    const productId = this.parentElement.parentElement.id;
    if (btnType === 'plus') {
        const data = JSON.parse(localStorage.getItem('requiredData'))
        data.map(obj => {
            if (obj.whsId == wholesalersDropdown.value && obj.productId == productId) {
                const qty = this.previousElementSibling.innerText
                this.previousElementSibling.innerText = +qty + 1
                obj.quantity = +qty + 1
            }
        })
        localStorage.setItem('requiredData', JSON.stringify(data))
    }
    if (btnType === 'sub') {
        const data = JSON.parse(localStorage.getItem('requiredData'))
        data.map(obj => {
            if (obj.whsId == wholesalersDropdown.value && obj.productId == productId) {
                const qty = this.nextElementSibling.innerText
                this.nextElementSibling.innerText = +qty - 1
                obj.quantity = +qty - 1
            }
        })
        localStorage.setItem('requiredData', JSON.stringify(data))
    }
}

$.ajax({
    type: 'GET',
    url: userUrl,
    headers: {
        'Netco-JWT': parseLoginData.token
    },
    success: function (res) {
        console.log(res);
    },
    error: function (request, textStatus, errorThrown) {
        if (request.status == 403) console.log('unAuthorized!');
        else if (request.status == 404) console.log(request.responseJSON.error);
        else if (request.status == 0) console.log('Failed');
        else console.log(request);
        console.log(textStatus);
    }
})