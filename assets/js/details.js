const getCategoryProducts = async () => {

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const {data} = await axios.get (`https://fakestoreapi.com/products/category/${category}`);
return data;

}

const displayProducts = async () => {

const products = await getCategoryProducts ();

const result = products.map (product=>

    `
    <div class='product'>
        <img src ="${product.image}"/>
        <h2>${product.title}</h2>
        <p>${product.price}</p>
        <a href ='products.html?id=${product.id}'>details</a>
    </div>
    `
).join( " ");

document.querySelector(".products .row").innerHTML =  result;

}

displayProducts();