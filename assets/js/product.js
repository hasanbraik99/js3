const getProducts = async (page) => {
    const skip = (page - 1) * 5;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=5&skip=${skip}`);
    return data;
}

const displayProducts = async (page = 1) => {
    const data = await getProducts(page);
    const total = Math.ceil(data.total / 5);
    const products = data.products;
    const result = products.map(product =>
        `
            <div class = "product">
            <h2>${product.title}</h2>
            <img src = "${product.thumbnail}" class="product-image"/>
            </div>
        `
    ).join(" ");

    document.querySelector(".products .row").innerHTML = result;

    customModal();

    let paginationLink = "";
    if (page > 1) {
        paginationLink = `<li><button onclick="displayProducts(${page - 1})">&lt;</button></li>`;
    } else {
        paginationLink += "<li><button disabled>&lt;</button></li>";    
    }

    for (let i = 1; i <= total; i++) {
        paginationLink += `<li><button onclick="displayProducts(${i})">${i}</button></li>`;
    }

    if (page < total) {
        paginationLink += `<li><button onclick="displayProducts(${parseInt(page) + 1})">&gt;</button></li>`;
    } else {    
        paginationLink += "<li><button disabled>&gt;</button></li>";
    }

    document.querySelector(".pagination").innerHTML = paginationLink;
};

displayProducts();

    function customModal() {
        const modal = document.querySelector(".my-modal");
        const closeBtn = document.querySelector(".x-btn");
        const rightBtn = document.querySelector(".right-btn");
        const leftBtn = document.querySelector(".left-btn");
        const images = Array.from   (document.querySelectorAll(".product-image"));
        let currentIndex = 0;

        images.forEach(function(img){
            img.addEventListener("click",(e)=>{
                console.log(e.target);
                modal.classList.remove("d-none");
                modal.querySelector("img").setAttribute("src",e.target.src);


                const currentImg = e.target;
                currentIndex= images.indexOf(currentImg);
                console.log(currentIndex);

            });

        });


        closeBtn.addEventListener("click",(e)=>{
            modal.classList.add("d-none");

        })

        rightBtn.addEventListener("click",(e)=>{
            currentIndex++;
            if(currentIndex >= images.length){
                currentIndex = 0;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
            console.log(src);
        })
        leftBtn.addEventListener("click",(e)=>{
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = images.length-1;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
            console.log(src);
        })


        document.addEventListener("keydown",(e)=>{

            if(e.code =="ArrowRight"){

                currentIndex++;
                if(currentIndex >= images.length){
                    currentIndex = 0;
                }
                const src = images[currentIndex].getAttribute("src");
                modal.querySelector("img").setAttribute("src",src);
            }
            else if(e.code == "ArrowLeft"){
                currentIndex--;
            if(currentIndex < 0){
                currentIndex = images.length-1;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
            console.log(src);

        }else if(e.code=="Escape"){

            modal.classList.add("d-none");


        }
        
        })


}

