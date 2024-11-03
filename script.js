const sections = document.querySelectorAll("section");
const dots =document.querySelectorAll(".dot");
let currentSection=0; // Keeps track of the current active section
let istransitioning = false; //adds flag to control transition timing preventing transitions from occuring at once
// Intersection Observer setup for scroll-in effect


// Function that updates active section and dots

function updateActiveSection(){
    sections.forEach((section,index) => {  //Loops through each section and its corresponding dots ensuring that all sections and dots are reset before updating 
        section.classList.remove("active");
        dots[index].classList.remove("active");
    });
    sections[currentSection].classList.add("active");  //After removing the active class from all the dots and sections,this line adds the active class back to the active section and dot based on the current section variable
    dots[currentSection].classList.add("active");
    //Body's background colour based on the active section
    document.body.style.backgroundColor = getComputedStyle(sections[currentSection]).backgroundColor;
    
}


    

// Smooth scrolling function
function smoothScroll(deltaY){  //deltaY represents the distance scrolled(+ve for down and -ve for up)
if (istransitioning) return; //checks if a transition is currntly happening  if so function returns early prventing any further actuons
istransitioning = true;
setTimeout(()=> istransitioning = false, 500); // indicates a transition in progreess then sets transtion to false after 1000 millliseconds ensuring user can scroll again after transition finishes

if (deltaY > 0){
    currentSection = Math.min(currentSection + 1 , sections.length - 1);
}else{
    currentSection = Math.max(currentSection - 1,0);
} //This means that deltaY is positive currentSection increases by 1 but not beyond the lastsection, if negative it decrements by 1 but not beyond 0

updateActiveSection(); // update based on the new value of the current section
}


   


// Scroll event listener
window.addEventListener("wheel", (Event) =>{ //adds an event listener to the window that listens for a wheel vent(triggered by scrolling the  mouse). If no transition is happening it calls the smoothscroll function which tells how much the user has scrollled
    if(!istransitioning){
        smoothScroll(Event.deltaY);
    }
});


// Touch event for mobile (also applying smooth scrolling)
let touchStartY = 0; // stores the y-coordinate of where the user first touches the screen
window.addEventListener("touchstart", (Event) => {
    touchStartY = Event.touches[0].clientY;
});

window.addEventListener("touchmove", (event) => {
    const touchEndY = Event.touches[0].clientY;
    if (touchStartY > touchEndY + 30) {
        // Swiped up
        smoothScroll(1); // Same behavior as scroll down
    } else if (touchStartY < touchEndY - 30) {
        // Swiped down
        smoothScroll(-1); // Same behavior as scroll up
    }
});


updateActiveSection();


// HAMBURGER MENU

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('nav-active');
  });
  