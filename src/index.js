"use strict"
const ramenUrl = "http://localhost:3000/ramens";
let firstImage = true;

window.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  getRamen();
  createNewRamenSubmitListener();
  deleteButton();
  patchCommentAndRating();
});

function getRamen() {
  fetch(ramenUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let x = 0; x < data.length; x++) {
        showRamen(data[x]);
      }
    });
}

//sets the default value and then creates the other image elements
function showRamen(ramen) {
    if(firstImage === true){
        let imageDisplay = document.getElementById("image-display");
        let imageName = document.getElementById("name-display");
        let imageRestaurant = document.getElementById("restaurant-display");
        let imageRating = document.getElementById("rating-display");
        let imageComment = document.getElementById("comment-display");
        imageDisplay.src = ramen.image;
        imageDisplay.dataset.ramenObjectId = ramen.id
        imageName.innerText = ramen.name;
        imageRestaurant.innerText = ramen.restaurant;
        imageRating.innerText = ramen.rating;
        imageComment.innerText = ramen.comment;
        firstImage = false
    }
  let ramenDiv = document.createElement("div");
  let ramenImg = document.createElement("img");
  ramenImg.src = ramen.image;
  //THIS ADDS THE ID TO ALL THE IMAGES 
  ramenImg.dataset.ramenObjectId = ramen.id
  //add the click on image event listener to every image using callback here
  ramenImg.addEventListener("click", (e) => displayRamenInfo(e, ramen));
  ramenDiv.append(ramenImg);
  document.getElementById("ramen-menu").appendChild(ramenDiv);
}

function displayRamenInfo(e, ramen) {
  //how can I back tab all of these?
  e.preventDefault();
  let imageDisplay = document.getElementById("image-display");
  let imageName = document.getElementById("name-display");
  let imageRestaurant = document.getElementById("restaurant-display");
  let imageRating = document.getElementById("rating-display");
  let imageComment = document.getElementById("comment-display");
  let ramenImage = e.target;
  //console.log(ramenImage)
  //console.log(e.target)
  imageDisplay.src = ramenImage.src;
  imageDisplay.dataset.ramenObjectId = ramen.id
  console.log(imageDisplay)
  imageName.innerText = ramen.name;
  imageRestaurant.innerText = ramen.restaurant;
  imageRating.innerText = ramen.rating;
  imageComment.innerText = ramen.comment;
}

function createNewRamenSubmitListener() {
  document.getElementById("new-ramen").addEventListener("submit", (e) => {
    e.preventDefault();
    const ramenName = document.getElementById("new-name").value;
    const ramenRestaurant = document.getElementById("new-restaurant").value;
    const ramenImage = document.getElementById("new-image").value;
    const ramenRating = document.getElementById("new-rating").value;
    const ramenComment = document.getElementById("new-comment").value;
    let newRamen = {
      name: ramenName,
      restaurant: ramenRestaurant,
      image: ramenImage,
      rating: ramenRating,
      comment: ramenComment,
    };
    postNewRamen(newRamen);
  });
}

//submit the newRamen Form
function postNewRamen(data = {}) {
  fetch(ramenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

//select the displayed image
//then call updateCommentAndRating
//in this function is where I would take the new rating and comment
function patchCommentAndRating(){
    document.getElementById("edit-ramen").addEventListener("submit", (e) => {
        //e.preventDefault()
        let imageDisplay = document.getElementById("image-display")
        const newRating = document.getElementById("new-rating").value
        const newComment = document.getElementById("new-comment").value
        let newRamenInfo = {rating:newRating, comment:newComment}
        updateCommentAndRating(imageDisplay.dataset.ramenObjectId, newRamenInfo)
    });
}

function updateCommentAndRating(id, data={}) {
    //update the comment to the new comment and rating to new rating - innerText
    //need to use the id of the displayed image
    fetch(ramenUrl + `/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
}

//need to somehow select the displayed image
function deleteButton(){
    document.getElementById("delete-ramen-button").addEventListener("click", (e) => {
        let imageDisplay = document.getElementById("image-display")
        deleteRamen(imageDisplay.dataset.ramenObjectId)
    });
}

function deleteRamen(id) {
    fetch(ramenUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
}
