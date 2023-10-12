import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, query } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://gratitude-giver-default-rtdb.firebaseio.com/" //replaced with my database url!!!
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const GratitudeGiverInDB = ref(database, "gratitude-giver")

///// Get Elements ///// 
const inputTxt = document.getElementById("input-txt")
const inputBtn = document.getElementById("input-btn")
const commentsEl = document.getElementById("comments-el")
const fromFieldEl = document.getElementById("from-field")
const toFieldEl = document.getElementById("to-field")

///// Button Click ///// 
inputBtn.addEventListener("click", function() {
    let inputValue = inputTxt.value
    let toValue = toFieldEl.value
    let fromValue = fromFieldEl.value
    let allFields = {  // Create an object from the input fields
        message: inputValue,
        to: toValue,
        from: fromValue
    }
    push(GratitudeGiverInDB, allFields) // push all fields to database
    clearinputTxt()
})

onValue(GratitudeGiverInDB, function(snapshot){
    if (snapshot.exists()) {
        let arrayItems = Object.entries(snapshot.val())
        clearCommentsEl()
        for (let i = 0; i < arrayItems.length; i++) {
            let currentItem = arrayItems[i]
            addItemToCommentsSection(currentItem)

        }
    } else {
        commentsEl.innerHTML = "No items here... yet"
    }
})

function clearinputTxt() {
    inputTxt.value = ""
    fromFieldEl.value = ""
    toFieldEl.value = ""
}

function clearCommentsEl() {
    commentsEl.innerHTML = ""
}

function addItemToCommentsSection(item) {
    let itemValue = item[1]
    
    let newEl = document.createElement("li") // create the li
    
    let fromEl = document.createElement("div")  // Creates From: Element
    fromEl.textContent = `From ${itemValue.from}`
    fromEl.classList.add('bold-text')

    let messageEl = document.createElement("div")  // Creates Message Element
    messageEl.textContent = itemValue.message

    let toEl = document.createElement("div")  // Creates To: Element
    toEl.textContent = `To ${itemValue.to}`
    toEl.classList.add('bold-text')

    newEl.textContent = itemValue
    commentsEl.append(toEl, messageEl, fromEl)
    if (commentsEl.firstChild) {  // places newest endorsement first
        commentsEl.insertBefore(newEl, commentsEl.firstChild);
    } else {
        commentsEl.append(newEl);
    }
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
// now it's getting the second letter of each word haha! YAY GOT IT!
// reverse the order! DONE!!!
// add mickey hand! DONE!

// add to and from sections!
// close!! The new divs need to go inside of the LI that I already have! YAY! SO CLOSE!!!!!