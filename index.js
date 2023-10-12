import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, query } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://gratitude-giver-default-rtdb.firebaseio.com/" //replaced with my database url!!!
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const GratitudeGiverInDB = ref(database, "gratitude-giver")

const inputTxt = document.getElementById("input-txt")
const inputBtn = document.getElementById("input-btn")
const commentsEl = document.getElementById("comments-el")

inputBtn.addEventListener("click", function() {
    // console.log("button clicked!")
    let inputValue = inputTxt.value
    //console.log(inputValue)
    push(GratitudeGiverInDB, inputValue) 
    clearinputTxt()
})

onValue(GratitudeGiverInDB, function(snapshot){
    let arrayItems = Object.values(snapshot.val())
    //const q = query(snapshot, orderBy("name"));

    //console.log(arrayItems)
    clearCommentsEl()
    for (let i = 0; i < arrayItems.length; i++) {
        addItemToCommentsSection(arrayItems[i])
        console.log(arrayItems[i])
    }
})

function clearinputTxt() {
    inputTxt.value = ""
}

function clearCommentsEl() {
    commentsEl.innerHTML = ""
}

function addItemToCommentsSection(itemValue) {
    commentsEl.innerHTML += `<li>${itemValue}</li>`


}





// backup before I change this above!!
// function addItemToCommentsSection(itemValue) {
//     commentsEl.innerHTML += `<li>${itemValue}</li>`
// }



// new comments are going below!
// only one at a time though - Fixed with +=!!! YAY!!!
// put them in the p tags that I made! hahaha make that an UL! - DONE!!

// make it work with the database! = done!!
// pull in the previous entries!! - working YAY!!!

// I add the clear comments list before each loop, now it's adding two each time! - FIXED!

// reverse the order!