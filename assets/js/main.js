const getCategories = async () =>{
    try {
    const {data} = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
    }
    catch(error){
        return[];
    }
}

const displayCategories = async () =>{


    try {
    const categories = await getCategories();

    if (categories.length ==0) {
        document.querySelector(".categories .row").innerHTML = "<p>Try Again. Error.</p>";

    }

    else {
    const result = categories.map(category=>

                 `
            <div class="category">
                <h2>${category}</h2>
            <a href="./details.html?category=${category}">Details</a>
            </div>

            `
    ).join(" ");

    document.querySelector(".categories .row").innerHTML = result;
    document.querySelector(".loading").classList.add("d-none");

}
    }
    catch(error){
        document.querySelector(".categories .row").innerHTML = "<p>Try Again. Error.</p>";;
        
    }

    finally{

    document.querySelector(".loading").classList.add("d-none");

    }
}
displayCategories();






window.onscroll = function(){
    const header = document.querySelector("header");
    const about = document.querySelector(".about");
    
    if(window.scrollY > about.offsetTop){
        header.classList.add("header-scrolled");
    }
    else{
        header.classList.remove("header-scrolled");

    }
}