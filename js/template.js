//check if there is loocal storage color option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  //console.log(mainColors);
  document.documentElement.style.setProperty("--main-color", mainColors);

  //remove active class from all colors list
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //add active class on element with data-color === local storage item
    if (element.dataset.color === mainColors) {
      //add active class
      element.classList.add("active");
    }
  });
}

//toggle spin class on icon
document.querySelector(".toggle-icon .fa-cog").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch colors
const colorsList = document.querySelectorAll(".colors-list li");
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    //remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    //add active class
    e.target.classList.add("active");
  });
});

//random background option
let backgroundOption = true;

//var to control background interval
let backgroundInterval;

//check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

//check if random background local storage is not empty
if(backgroundLocalItem !== null) {
  
 

  if(backgroundLocalItem === 'true'){
    backgroundOption = true;
  }
  else{
    backgroundOption = false;
  }
 //remove active class from all spans
 document.querySelectorAll(".random span").forEach(element => {
  element.classList.remove("active");
 });

 if(backgroundLocalItem === 'true') {
   document.querySelector(".random .yes").classList.add("active");
 }
 else{
  document.querySelector(".random .no").classList.add("active");
 }
}
//switch random background
const randomBackground = document.querySelectorAll(".random span");

//loop on all spans
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {

    //remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    //add active class
    e.target.classList.add("active");

    if(e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomImgs ();
      localStorage.setItem("background-option",true);
    }
    else{
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option",false);
    }
  });
});

//select landing page element

let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


//random background option


function randomImgs () {
  if(backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //change background image url
      landingPage.style.backgroundImage =
        'url("img/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}
randomImgs ();

//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
 
//skills offset top 
let skillsOffsetTop = ourSkills.offsetTop;

//skill souter height
let skillsOuterHeight = ourSkills.offsetHeight;

//window height
let windowHeight = this.innerHeight;

//window scrollTop
let windowScrollTop = this.pageYOffset;

if(windowScrollTop > (skillsOuterHeight - windowHeight + 40)) {

  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
  

  allSkills.forEach(skill => {
    skill.style.width = skill.dataset.progress;
  });
}
}

//create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
img.addEventListener('click',(e) => {

  //create overlay element
  let overlay = document.createElement("div");

  //add class to overlay
  overlay.className = 'popup-overlay';

  //append overlay to body
  document.body.appendChild(overlay)

  //create popup box
  let popupBox = document.createElement("div");

  //add class to the popup box
  popupBox.className = 'popup-box';

  if(img.alt !== null) {

    //create heading
    let imgHeading = document.createElement("h3");
  
    //create text for heading
    let imgText = document.createTextNode(img.alt);
  
    //append the text to the heading
    imgHeading.appendChild(imgText);
  
    //apeend the heading to popup box
    popupBox.appendChild(imgHeading);
   }
  //create the image
  let popupImage = document.createElement("img");

  //set image source
  popupImage.src = img.src;
  console.log(img.src)

 //add image to popup box
 popupBox.appendChild(popupImage);

 //append the popup box to body
 document.body.appendChild(popupBox);

 //create the close span
 let closeButton = document.createElement("span");

 //create the close button text

 let closeButtonText = document.createTextNode("X")

 //append text to close button
 closeButton.appendChild(closeButtonText);

 //add class to close button
 closeButton.className = 'close-button';

 //add close button to the popup box
 popupBox.appendChild(closeButton);

})
});