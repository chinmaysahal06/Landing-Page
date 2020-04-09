/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
document.addEventListener("DOMContentLoaded",OnLoaded);
/**
 * Define Global Variables
 * 
*/
const sectionArray=[];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function OnLoaded(){
    const sections=document.getElementsByTagName("section");
    buildNavigationBar(sections);
    buildSectionArray(sections)
    createScrollToTopView();
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigationBar(sections){
    const ul=document.querySelector("ul");
    for(let section of sections){
        const li = document.createElement("li");

        const id=section.getAttribute("id");
        const title=section.getAttribute("data-nav");
        
        li.textContent = title;
        li.classList.add(id);
        li.addEventListener('click', () => {
            document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        });
        ul.appendChild(li);
    };
    // const f = ul.firstElementChild;
    // f.firstElementChild.classList.add("active");
}


function buildSectionArray(sections) {
    for (section of sections) {

        const id = section.getAttribute('id');

        const top = Math.round(section.offsetTop);

        const offsetBottom = section.offsetTop + section.offsetHeight;
        const bottom = Math.round(offsetBottom);

        const ele = { Id: id, Top: top, Bottom: bottom };

        sectionArray.push(ele);
    }
}

//get the  button
function createScrollToTopView() {
    btnScrollToTop = document.getElementById("btnScrollToTop");

    window.onscroll = () => {
        changeScrollBtnDisplay();
        highlightActiveSection();
    };
}


// Add class 'active' to section when near top of viewport
function highlightActiveSection() {

    const y = Math.round(window.scrollY);

        const section = sectionArray.find((e) => {
            return (e.Top <= y) && (e.Bottom >= y);
        });


        if (section != undefined) {

            const id = section.Id;

            const e = document.querySelector(`li.${id}`);

            e.classList.add('activeElement');

            const eles = document.querySelectorAll(`li:not(.${id})`);

            for (ele of eles) {
                ele.classList.remove('activeElement');
            }
        }
        else {
            const eles = document.querySelectorAll('li');

            for (ele of eles) {
                ele.classList.remove('activeElement');
            }
        }
}



// function highlightActiveSection(){
//     const ul=document.querySelector("ul");
//     const li = ul.firstElementChild;
//     const a=li.firstElementChild;
//     a.classList.add("active");

//     const sec= document.getElementsByClassName("section");
//     for (let i = 0; i < sec.length; i++) {
//         sec[i].addEventListener("click", function() {
//           let current = document.getElementsByClassName("active");
//           current[0].className = current[0].className.replace(" active", "");
//           this.className += " active";
//         });
//       }
// }

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/
function changeScrollBtnDisplay() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScrollToTop.style.display = "block";
    } else {
        btnScrollToTop.style.display = "none";
    }
}


//scrollToTop Button
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}