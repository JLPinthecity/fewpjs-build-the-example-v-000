// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const modal = document.getElementById("modal");
const switcher = {'♡': '♥', '♥':'♡'};

//when page is loaded, add event listeners on each of the hearts?
document.addEventListener("DOMContentLoaded", activateHearts());

function activateHearts(){
  const heartsHTML = document.getElementsByClassName("like-glyph");
  const heartsArray = Array.from(heartsHTML)
  heartsArray.forEach(heart => {
    heart.addEventListener("click", event => {
      event.preventDefault()
      mimicServerCall()
      .then(() => {
        if (heart === EMPTY_HEART){
          heart.setAttribute("class", "activated-heart");
         } else {
          heart.setAttribute("class", "like-glyph");
        }
        heart.innerHTML = switcher[heart.innerHTML];
      })
      .catch(() => {
        modal.removeAttribute("class");
        setTimeout(function() {
          modal.setAttribute("class", "hidden");
        }, 3000);
      })
    })

  });
};






//When a user clicks on an empty heart:
//Invoke mimicServerCall to simulate making a server request
//When the "server" returns a failure status:
//Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
//Display the error modal by removing the .hidden class
//Display the server error message in the modal
//Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
//When the "server" returns a success status:
//Change the heart to a full heart
//Add the .activated-heart class to make the heart appear red
//When a user clicks on a full heart:
//Change the heart back to an empty heart
//Remove the .activated-heart class




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
