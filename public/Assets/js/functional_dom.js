const NavBar = document.querySelector(".section-head__nav");

//handle what happens when the user scrolls on the page
//ScrollHandler handles whether the navbar needs to be separated from the rest of the page and put as a fixed navbar at the top
//this depends on where the scrollbar is currently
ScrollHandler = (e)=>{
    if(window.scrollY>550){
        NavBar.classList.add("fixed");
    } else if(window.scrollY<550){
        NavBar.classList.remove("fixed");
    }
};
//run this immediately to determine how to modify the navbar - this will allow for the navbar to appear appropriately when the page is below a certain height
ScrollHandler();
//event handler for when the user scrolls in the page - uses the ScrollHandler function for the callback function
window.addEventListener("scroll",ScrollHandler)

//SHOWING ABOUT PAGE ON PAGE LOAD
setTimeout(() => {
    document.getElementById("about").classList.add("active");
    document.getElementsByClassName("section-about")[0].classList.add("show_horizontal");
},4500);

//NAVIGATION FUNCTIONS
const NavItems = document.getElementsByClassName("section-head__nav-item");
const Sections = document.querySelectorAll("section");

[...NavItems].forEach(NavItem=>NavItem.addEventListener("click",NavClickHandler));

function NavClickHandler (){
    [...NavItems].forEach(NavItem=>{
        NavItem.classList.remove("active");
    })
    this.classList.add("active");
    const title = this.getAttribute("id");
    [...Sections].forEach(Section=>{
            if(Section.getAttribute("id") !== title){
                Section.classList.remove("show_horizontal");//
            }
        });
    
    const ActiveSection = document.getElementsByClassName(`section-${title}`)[0];
    ActiveSection.classList.add("show_horizontal");
    window.scrollY>550 ? ActiveSection.scrollIntoView(true) : null;
    title==="skills" ? 
        document.querySelector(".section-skills__carousel-row").classList.contains("table-active") ?
            null
            :
            setTimeout(()=>{document.querySelector(".section-skills__carousel-row").classList.add("carousel-active")},500)
        :
        setTimeout(()=>{document.querySelector(".section-skills__carousel-row").classList.remove("carousel-active")},500);
}

//CAROUSEL TOGGLE FUNCTIONS
const ToggleButtons = document.getElementsByClassName("btn-toggle");
const Carousel = document.getElementsByClassName("section-skills__carousel-row")[0];
[...ToggleButtons].forEach(ToggleButton=>ToggleButton.addEventListener("click",ButtonClickHandler));

function ButtonClickHandler() {
    if(this.classList.contains("carousel")){
        if(!Carousel.classList.contains("carousel-active")){
            Carousel.classList.add("carousel-active");
            Carousel.classList.remove("table-active");
        } 
    } else if(this.classList.contains("table")){
        if(!Carousel.classList.contains("table-active")){
            Carousel.classList.add("table-active");
            Carousel.classList.remove("carousel-active");                        
        }
    }
}
//IMAGE GALLERY FOR PROJECTS
const IMGs = document.querySelectorAll(".img_container");
const ProjectSheets = document.querySelectorAll(".project-sheet");
const preChoice_title = document.querySelector(".preChoice");

[...IMGs].forEach(IMG=>IMG.addEventListener("click",IMGClickListener));
[...IMGs].forEach(IMG=>IMG.addEventListener("mouseover",IMGMouseOverListener));
[...IMGs].forEach(IMG=>IMG.addEventListener("mouseout",IMGMouseOutListener));

function IMGClickListener(){
    [...IMGs].forEach(IMG=>IMG.classList.remove("chosen"));
    //get project name of the project associated with the picture that was clicked
    const projectName = this.dataset.id;
    [...ProjectSheets].forEach(ProjectSheet=>{
        if(ProjectSheet.dataset.id===projectName){
            !ProjectSheet.classList.contains("shown") ?
                ProjectSheet.classList.add("shown")
            :
                null
            ;
        } else {
            ProjectSheet.classList.remove("shown");
        }
        });
    this.classList.add("chosen");
    const project = this.dataset.project;
}

function IMGMouseOverListener(){
    const projectName = this.dataset.project;
    preChoice_title.textContent = projectName;
    preChoice_title.classList.remove("out");
    preChoice_title.classList.add("in");
}

function IMGMouseOutListener(){
    preChoice_title.classList.remove("in");
    preChoice_title.classList.add("out");
    setTimeout(()=>preChoice_title.classList.remove("out"),250);
}

const EmailBtn = document.querySelector(".social_links-point.social_links-email");
const BizCardBtn = document.querySelector(".social_links-point.social_links-business-card");
const Emailer = document.querySelector(".email-form");
const BusinessCard = document.querySelector(".business-card");

function ToggleEmailContact(){
    if(!Emailer.classList.contains("show-contact")){
        Emailer.classList.add("show-contact");
        BusinessCard.classList.remove("show-contact");
    }
}

EmailBtn.addEventListener("click",ToggleEmailContact);

function ToggleBizCardContact(){
    if(!BusinessCard.classList.contains("show-contact")){
        BusinessCard.classList.add("show-contact");
        Emailer.classList.remove("show-contact");
    }
}

BizCardBtn.addEventListener("click",ToggleBizCardContact);
