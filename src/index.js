// write your code here
"use strict"
const ramenUrl = "http://localhost:3000/ramens"

window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    getRamen()
    createNewRamenSubmitListener()
});

function getRamen(){
    fetch(ramenUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('ramen-menu').innerHTML="";
        for(let x=0; x<data.length; x++){
            showRamen(data[x])
        }
    });
}

//in here I want to add a default value - I want to be able to getElementByID().setDefaultValue
//or I was thinking of adding the default values directly into the HTML so when the page loads 
//so does the default value
function showRamen(ramen){
    let ramenDiv = document.createElement("div")
    let ramenImg = document.createElement("img")
    
    ramenImg.src = ramen.image;

    //add the click on image event listener to every image using callback here
    ramenImg.addEventListener("click", e => displayRamenInfo(e, ramen))

    ramenDiv.append(ramenImg)
    document.getElementById("ramen-menu").appendChild(ramenDiv)

}

function displayRamenInfo(e, ramen){
    //how can I back tab all of these?
        e.preventDefault()
        let imageDisplay = document.getElementById("image-display")
        let imageName = document.getElementById("name-display")
        let imageRestaurant = document.getElementById("restaurant-display")
        let imageRating = document.getElementById("rating-display")
        let imageComment = document.getElementById("comment-display")

        let ramenImage = e.target
        //console.log(ramenImage)
        imageDisplay.src = ramenImage.src
        imageName.innerText = ramen.name
        imageRestaurant.innerText = ramen.restaurant
        imageRating.innerText = ramen.rating
        imageComment.innerText = ramen.comment
    
    //to patch the comments and ratings
    //add variable here to get the currently displayed ramen
    //then add an eventlistener that calles the updateCommentAndRating

}

function createNewRamenSubmitListener(){
    document.getElementById("new-ramen").addEventListener("submit", (e) =>{
        e.preventDefault()
        const ramenName = document.getElementById("new-name").value
        const ramenRestaurant = document.getElementById("new-restaurant").value
        const ramenImage = document.getElementById("new-image").value
        const ramenRating = document.getElementById("new-rating").value
        const ramenComment = document.getElementById("new-comment").value
        let newRamen = {name:ramenName, restaurant:ramenRestaurant, image: ramenImage, rating: ramenRating, comment:ramenComment}
        postNewRamen(ramenUrl, newRamen)
    });
}

//call this function in the event listener for submit new ramen
//submit the newRamen Form
function postNewRamen(ramenUrl, data={}){
    fetch(ramenUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }, body: JSON.stringify(data)
    }).then(response => response.json()).then(data => console.log(data));
}

function updateCommentAndRating(e, id){
    e.preventDefault()

}

//add a button at the bottom of the page
//have a click event to click on the image that you want to delete
//then take the image and the object and use a fetch delete function
function deleteRamen(){

}