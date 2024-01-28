const navWidth = $('.left-bar').outerWidth()
// console.log(navWidth);
$('.fa-xmark').on('click', function () {
    let sidebarInnerLeft = $('.side-bar').css('marginLeft');
    // console.log(sidebarInnerLeft)
    if (sidebarInnerLeft === `${0}px`) {
        $('.side-bar').animate({ marginLeft: `-${navWidth}` }, 500)
        $('.fa-xmark').addClass("fa-bars").removeClass("fa-xmark")
        $('.menu-items li').animate({ top: "200px" }, 500);
    } else {
        $('.side-bar').animate({ marginLeft: 0 }, 700)
        $('.fa-bars').addClass("fa-xmark").removeClass("fa-bars")
        $('.menu-items li').eq(0).animate({ top: 0 }, 500, function () {
            $('.menu-items li').eq(1).animate({ top: 0 }, 100, function () {
                $('.menu-items li').eq(2).animate({ top: 0 }, 100, function () {
                    $('.menu-items li').eq(3).animate({ top: 0 }, 100, function () {
                        $('.menu-items li').eq(4).animate({ top: 0 }, 100)
                    })
                });
            });
        });


    }

})

$(document).ready(function () {
    $('.side-bar').animate({ marginLeft: `-${navWidth}` }, 100)
    $('.fa-xmark').addClass("fa-bars").removeClass("fa-xmark")
    $('.menu-items li').animate({ top: "200px" }, 500);
});




let searchByName = document.querySelector(".search-name")
let searchByLetter = document.querySelector(".search-letter")


async function callFood() {
    $('.loading').removeClass("d-none")
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    const resulte = await data.json()
    console.log(resulte)
    displayFood(resulte)
    $('.loading').addClass("d-none")
}

async function getDetails(myId) {
    $('.loading').removeClass("d-none")
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${myId}`)
    const res = await data.json()
    console.log(res)
    hideSearch()
    displayDetails(res)
    $('.loading').addClass("d-none")
}

async function searchAPIByName(food) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
    let res = await data.json()
    console.log(res)
    displayFood(res)

}
async function searchAPIByLetter(letter) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let res = await data.json()
    console.log(res)
    displayFood(res)

}

async function callAllCategories() {
    $('.loading').removeClass("d-none")
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const resulte = await data.json()
    console.log(resulte)
    hideSearch()
    displayCategory(resulte)
    $('.loading').addClass("d-none")
}

async function callByCategory(cat) {
    $('.loading').removeClass("d-none")
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    const resulte = await data.json()
    console.log(resulte)
    hideSearch()
    displayFood(resulte)
    $('.loading').addClass("d-none")
}

async function allAreas() {
    $('.loading').removeClass("d-none")
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const resulte = await data.json()
    console.log(resulte)
    hideSearch()
    displayArea(resulte)
    $('.loading').addClass("d-none")
}

async function displayAreaFood(area) {
    $('.loading').removeClass("d-none")
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const resulte = await data.json()
    console.log(resulte)
    hideSearch()
    displayFood(resulte)
    $('.loading').addClass("d-none")
}

async function allIdIngredients() {
    $('.loading').removeClass("d-none")
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const resulte = await data.json()
    console.log(resulte)
    hideSearch()
    displayIngredients(resulte)
    $('.loading').addClass("d-none")
}

async function displayIngredientFood(ingredient) {
    $('.loading').removeClass("d-none")
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const resulte = await data.json()
    console.log(resulte)
    hideSearch()
    displayFood(resulte)
    $('.loading').addClass("d-none")
}


function displayFood(res) {
    console.log(res);
    cartona = ``
    for (let i = 0; i < res.meals.length; i++) {

        cartona += `<div class="col-lg-3">
        <div onclick = "getDetails(${res.meals[i].idMeal})" class="img-holder">
          <img class="w-100" src=${res.meals[i].strMealThumb} alt="${res.meals[i].strMeal}">
          <div class="overlay p-2">
            ${res.meals[i].strMeal}
          </div>
        </div>
      </div>`

    }
    document.querySelector(".pics").innerHTML = cartona
}

function displayDetails(res) {
    let listCard = ``

    for (let i = 1; i < 21; i++) {
        console.log(res.meals[0][`strIngredient${i}`])
        if (res.meals[0][`strIngredient${i}`] != "") {
            listCard += `<li class="btn btn-info ">${res.meals[0][`strIngredient${i}`]}</li>`
        }
    }
    console.log(listCard)
    let card = `<div class="col-lg-4">
    <div class="img-holder">
      <img class="w-100" src="${res.meals[0].strMealThumb}" alt="" />
      <h2 class="fw-bold">${res.meals[0].strMeal}</h2>
    </div>
  </div>
  <div class="col-lg-8">
    <h2 class="fw-bold">Instructions</h2>
    <p  class="mb-3 lh-2">
     ${res.meals[0].strInstructions}
    </p>
    <h3><span class="fw-bold">Area :</span> ${res.meals[0].strArea}</h3>
    <h3><span class="fw-bolder">Category :</span> ${res.meals[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="ps-2 d-flex flex-wrap gap-2">
      ${listCard}
    </ul>
    <h3 class="mb-3">Tags :</h3>
    <ul class="list-unstyled d-flex gap-3 ps-2">
      <li>
        <a class="text-decoration-none text-light btn btn-success" href="${res.meals[0].strSource}"
          >Source</a
        >
      </li>
      <li>
        <a class="text-decoration-none text-light btn btn-danger" href="${res.meals[0].strYoutube}"
          >Youtube</a
        >
      </li>
    </ul>
  </div>`

    document.querySelector(".pics").innerHTML = card
}

function displayCategory(res) {
    cartona = ``
    for (let i = 0; i < res.categories.length; i++) {
        // console.log(res.categories[i].strCategory);
        cartona += `<div class="col-lg-3">
        
        <div onclick = "callByCategory('${res.categories[i].strCategory}')" class="img-holder">
          <img class="w-100" src=${res.categories[i].strCategoryThumb} alt="${res.categories[i].strCategory}">
          <div class="overlay p-2 text-center overflow-hidden d-flex flex-column">
            <h3>${res.categories[i].strCategory}</h3>
            <p class=" overflow-hidden fs-6 pt-1 fw-light">${res.categories[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>`

    }
    document.querySelector(".pics").innerHTML = cartona
}

function displayArea(res) {
    cartona = ``
    for (let i = 0; i < res.meals.length; i++) {
        // console.log(res.categories[i].strCategory);
        cartona += `<div class="col-md-3">
        <div onclick = "displayAreaFood('${res.meals[i].strArea}')"  class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${res.meals[i].strArea}</h3>
        </div>
</div>`

    }
    document.querySelector(".pics").innerHTML = cartona
}
function displayIngredients(res) {
    cartona = ``
    for (let i = 0; i < 20; i++) {
        // console.log(res.categories[i].strCategory);
        cartona += `<div class="col-md-3">
        <div onclick = "displayIngredientFood('${res.meals[i].strIngredient}')"  class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${res.meals[i].strIngredient}</h3>
                <p class = "ingredients-text ">${res.meals[i].strDescription}</p>
        </div>
</div>`

    }
    document.querySelector(".pics").innerHTML = cartona
}

function contactUs() {
    hideSearch()
    $(".contact").removeClass("d-none")
    document.querySelector(".pics").classList.add("d-none")

}


function removeContactUs() {
    $(".contact").addClass("d-none")
    document.querySelector(".pics").classList.remove("d-none")
}



function showSearch() {
    $(".search").removeClass("d-none")
    document.querySelector(".pics").innerHTML = ""
}
function hideSearch() {
    $(".search").addClass("d-none")
}

function closeNave() {
    $('.side-bar').animate({ marginLeft: `-${navWidth}` }, 700)
    $('.fa-xmark').addClass("fa-bars").removeClass("fa-xmark")
}

function validateTheName() {
    var regex = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/

    var x = regex.test($('.user-name').val())

    if (x == true) {
        $(".alert-name").addClass("d-none")

    } else {
        $(".alert-name").removeClass("d-none")
    }
    console.log("aaaaa");
    return x
}
function validateTheEmail() {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    var x = regex.test($('.user-email').val())

    if (x == true) {
        $(".alert-email").addClass("d-none")
    } else {
        $(".alert-email").removeClass("d-none")
    }

    return x
}
function validateThePhone() {
    var regex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/

    var x = regex.test($('.user-phone').val())

    if (x == true) {
        $(".alert-phone").addClass("d-none")
    } else {
        $(".alert-phone").removeClass("d-none")
    }

    return x
}
function validateTheAge() {
    var regex = /^(1[89]|[2-9]\d)$/

    var x = regex.test($('.user-age').val())

    if (x == true) {
        $(".alert-age").addClass("d-none")
    } else {
        $(".alert-age").removeClass("d-none")
    }
    return x

}
function validateThePassword() {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    var x = regex.test($('.user-password').val())

    if (x == true) {
        $(".alert-password").addClass("d-none")
    } else {
        $(".alert-password").removeClass("d-none")
    }

    return x

}
function validateTheRepassword() {
    if ($('.user-repassword').val() == $('.user-password').val()) {
        $(".alert-repassword").addClass("d-none")
        return true
    } else {
        $(".alert-repassword").removeClass("d-none")
        return false
    }
}

function removeDisable() {
    if (validateTheName() && validateTheEmail() && validateThePhone() && validateTheAge() && validateThePassword() && validateTheRepassword()) {
        $(".sub").removeClass("disabled")
    } else {
        $(".sub").addClass("disabled")
    }
}




callFood()





//! =================> events================>
searchByName.addEventListener("input", function () {
    searchAPIByName(searchByName.value)
})

searchByLetter.addEventListener('input', function () {
    if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);

    }
    searchAPIByLetter(this.value)
})


$('.user-name').on("input", function () {
    validateTheName()
    removeDisable()
})
$('.user-email').on("input", function () {
    validateTheEmail()
    removeDisable()
})
$('.user-phone').on("input", function () {
    validateThePhone()
    removeDisable()
})
$('.user-age').on("input", function () {
    validateTheAge()
    removeDisable()
})
$('.user-password').on("input", function () {
    validateThePassword()
    removeDisable()
})
$('.user-repassword').on("input", function () {
    validateTheRepassword()
    removeDisable()
})