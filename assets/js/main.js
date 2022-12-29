const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
/* SHOW MENU */
// validate if navToggle exists
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add("show-menu")
    })
}
/* MENU HIDDEN */
// validate if navToggle exists
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove("show-menu")
    })
}
/* REMOVE MENU MOBILE */
const navLinks = document.querySelectorAll(".nav-link");

function linkAction(){
    const navMenu = document.getElementById("nav-menu");
    //when we click on each link, we remove show menu class
    navMenu.classList.remove("show-menu");
}

navLinks.forEach(n => n.addEventListener('click',linkAction));

/* CHANGE BACKGROUND HEADER */
function scrollHeader(){
    const header = document.getElementById("header");
    //when the scroll is greater than 80 vh, add the class scroll header to the tag header
    if(this.scrollY >= 80){
        header.classList.add("scroll-header");
    }else{
        header.classList.remove("scroll-header")
    }
}
window.addEventListener("scroll",scrollHeader);

/* TESTIMONIAL SWIPER */
var swiper = new Swiper(".testimonial-wrapper", {
    loop:'true',
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
    },
  });

/* SCROLL SECTIONS ACTIVE LINK */

//get all the sections that have an id defined
const sections = document.querySelectorAll("section[id]");

//add an event listener for scroll
window.addEventListener("scroll",navHighlight);

function navHighlight (){
    //get scroll position
    let scrollY = window.pageYOffset;

    //we loop through the sections to get height, top and id for each

    sections.forEach(curr =>{
        const secHeight = curr.offsetHeight;
        const secTop = curr.offsetTop;
        sectionId =  curr.getAttribute("id");
        console.log(secHeight,scrollY)
        
        // if our curr scroll position enters the space where curr section on screen is, add .active class to it,else remove
        // To know which link needs active class, we use sectionId variable we are getting through looping sections as an selector
        if(scrollY > secTop - 200 && scrollY <= secTop + secHeight - 200){
            document.querySelector('.nav-menu a[href*='+sectionId+']').classList.add("active-link")
        }else{
            document.querySelector('.nav-menu a[href*='+sectionId+']').classList.remove("active-link")
        }
    })
}

/* PORTFOLIO ITEM FILTER */
const filterContainer = document.querySelector(".portfolio-filter-inner");
const filterBtns = filterContainer.children;
const totalFilterBtns = filterBtns.length;
const portfolioItems = document.querySelector(".portfolio-items").children;
const totalPortfolioItems = portfolioItems.length;

for(let i=0;i<totalFilterBtns;i++){
    filterBtns[i].addEventListener("click",()=>{
        filterContainer.querySelector(".active").classList.remove("active");
        filterBtns[i].classList.add("active");

        const filterValue =filterBtns[i].getAttribute("data-filter");
        for(let j=0;j<totalPortfolioItems;j++){
            if(filterValue === portfolioItems[j].getAttribute("data-category")){
                portfolioItems[j].classList.remove("hide");
                portfolioItems[j].classList.add("show");
            }else{
                portfolioItems[j].classList.remove("show");
                portfolioItems[j].classList.add("hide");
            }
            if(filterValue === 'all'){
                portfolioItems[j].classList.remove("hide");
                portfolioItems[j].classList.add("show");
            }
        }
    })
}


/* THEME/DISPLAY CUSTOMIZATION */
const theme = document.getElementById("theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");

//open modal
const openThemeModal = () =>{
    themeModal.style.display = "grid";
}
//close modal
const closeThemeModal = (event) =>{
    if(event.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}
theme.addEventListener('click', openThemeModal);
themeModal.addEventListener('click',closeThemeModal);

/*===== FONTS =====*/

//remove active class form previous font size
const removeSize = () =>{
    fontSizes.forEach(size =>{
        size.classList.remove('active');
    })
}
fontSizes.forEach(size =>{
    size.addEventListener('click',()=>{
        removeSize();
        let fontSize;
        size.classList.toggle('active');
        if(size.classList.contains('font-size-1')){
            fontSize = '12px'
        } else if(size.classList.contains('font-size-2')){
            fontSize = '14px'
        }else if(size.classList.contains('font-size-3')){
            fontSize = '16px'
        }else if(size.classList.contains('font-size-4')){
            fontSize = '18px'
        }
        //change font size of root element
        document.querySelector('html').style.fontSize = fontSize;
    })
})

/*===== PRIMARY COLORS =====*/

// remove active class from all colors
const removeColor = () =>{
    colorPalette.forEach(color =>{
        color.classList.remove("active");
    })
}

colorPalette.forEach(color =>{
    color.addEventListener('click', ()=>{
        let primaryHue;
        removeColor();

        if(color.classList.contains('choose-color-1')){
            primaryHue = 252;
        }else if(color.classList.contains('choose-color-2')){
            primaryHue = 52;
        }else if(color.classList.contains('choose-color-3')){
            primaryHue = 352;
        }else if(color.classList.contains('choose-color-4')){
            primaryHue = 152;
        }else if(color.classList.contains('choose-color-5')){
            primaryHue = 202;
        }
        color.classList.add("active")
        root.style.setProperty('--primary-color-hue',primaryHue);
    })
})

/*===== THEME BACKGROUNDS =====*/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// change background color
const changeBg = () =>{
    root.style.setProperty("--light-color-lightness", lightColorLightness)
    root.style.setProperty("--white-color-lightness", whiteColorLightness)
    root.style.setProperty("--dark-color-lightness", darkColorLightness)
} 

bg1.addEventListener('click',()=>{

//add active class
bg1.classList.add("active");
//remove active class from others
bg3.classList.remove("active");
bg2.classList.remove("active");

darkColorLightness = '17%'
whiteColorLightness = '100%'
lightColorLightness = '92%'

changeBg();
})

bg2.addEventListener('click',()=>{
    darkColorLightness = '95%'
    whiteColorLightness = '20%'
    lightColorLightness = '15%'

//add active class
bg2.classList.add("active");
//remove active class from others
bg1.classList.remove("active");
bg3.classList.remove("active");
changeBg();
})

bg3.addEventListener('click',()=>{
    darkColorLightness = '95%'
    whiteColorLightness = '10%'
    lightColorLightness = '0%'

//add active class
bg3.classList.add("active");
//remove active class from others
bg2.classList.remove("active");
bg1.classList.remove("active");
changeBg();
})

