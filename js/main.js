/////////////////////////////////////////////// Start  var Meals    ////////////////////////////////////////
let httpRequestRecipes = new XMLHttpRequest();
let recipes = [];
let httpRequestCommits = new XMLHttpRequest();
let alert = document.getElementById('alertpage')
let links = document.querySelectorAll('.nav-link')
    /////////////////////////////////////////////// End  var Meals    ////////////////////////////////////////

/////////////////////////////////////////////// Start  fetch  id Meals function   ////////////////////////////////////////


for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        let currentMeals = e.target.text; ///// TEXT ===> text for html when clicked 
        getMeals(currentMeals)
    })
}
/////////////////////////////////////////////// End    fetch  id Meals function   ////////////////////////////////////////


/////////////////////////////////////////////// Start  fetch Meals function   ////////////////////////////////////////
getMeals('pizza')

function getMeals(meals) {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${meals}`).then(res => {
        console.log(res)
        if (res.status == 400) {
            alert.classList.remove('d-none')
        } else {
            alert.classList.add('d-none')

        }
        return res.json();
    }).then(data => {
        const display = data.recipes.map(respRecipse => {
            return `
        <div class="col-md-4 my-3 ">
            <img src="${respRecipse.image_url}" alt="">
            <h3 class="titleList my-4">${respRecipse.title}</h3>
            <p  class="publList">${respRecipse.publisher}</p>
            <div class="rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </div>
            <a  class="btn btn-outline-dark mb-3 mx-3" target="_blank" href="${respRecipse.source_url}">Resources</a>  
            <a  data-bs-toggle="modal" data-bs-target="#recipesDetailsModal" onclick="getDetails(${respRecipse.recipe_id})" class="btn  btn-outline-danger  mb-3 mx-3">Details</a>
        </div>
        `
        }).join('')
        console.log(display)
        document.getElementById('rowRecipes').innerHTML = display;

        console.log(display)
    }).catch(error => {
        console.log(error)
    })
}
/////////////////////////////////////////////// End  fetch Meals function   ////////////////////////////////////////

/////////////////////////////////////////////// Start  get Details function   ////////////////////////////////////////
let recipesDetails = {}
async function getDetails(recipeId) {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    let resDetails = await response.json()
    recipesDetails = resDetails.recipe;
    displayDetailsRecipes()
}

function displayDetailsRecipes() {
    let DetailsData =
        `
        <img src="${recipesDetails.image_url}">
        <h3>${recipesDetails.title}</h3>
        <p>${recipesDetails.ingredients}</p>
        `
    document.getElementById('recipesDetails').innerHTML = DetailsData;
}
/////////////////////////////////////////////// End  get Details function   ////////////////////////////////////////



/////////////////////////////////////////////// Stert  Owl-carosule function   ////////////////////////////////////////


$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoWidth: false,
    autoplayHoverPause: true,
    rewind: true,
    autoplayTimeout: 4000,
    navigation: false,

    autoplay: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: true
        }
    }
})

/////////////////////////////////////////////// End  Owl-carosule function   ////////////////////////////////////////


/////////////////////////////////////////////// Start  D-none nav links function   ////////////////////////////////////////


$('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
});
/////////////////////////////////////////////// End   D-none nav links function    ////////////////////////////////////////