const accessKey = "CBOV03tKxbJ-yAuifUOO8QD_h5P0zTiRWTGNLgKlcoM"

const formEl  =document.querySelector("form");
const searchInputEl =  document.getElementById("search-input");
const searchResulsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json();
    if (page ===1){
        searchResulsEl.innerHTML = ""
    }


    const results = data.results;

    results.map((result)=>{
        const imageWarpper = document.createElement("div")
        imageWarpper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent =  result.alt_description;

        imageWarpper.appendChild(image);
        imageWarpper.appendChild(imageLink);
        searchResulsEl.appendChild(imageWarpper);


    })
   
    page++;

    if(page > 1){
        showMoreButtonEl.style.display = "block";
    }
}

formEl.addEventListener("submit" , (event)=>{
    event.preventDefault()
    page = 1;
    searchImages();
})

showMoreButtonEl.addEventListener("click" , ()=>{
    searchImages();
})