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

///// Get items from the database ///// 
onValue(GratitudeGiverInDB, function(snapshot){
    if (snapshot.exists()) {
        let arrayItems = Object.entries(snapshot.val())
        clearCommentsEl()
        for (let i = 0; i < arrayItems.length; i++) {
            let currentItem = arrayItems[i]
            addItemToCommentsSection(currentItem)

        }
    } else {
        commentsEl.innerHTML = "Add your gratitude above!"
    }
})

///// Clear items when button is clicked! ///// 
function clearinputTxt() {
    inputTxt.value = ""
    fromFieldEl.value = ""
    toFieldEl.value = ""
}

function clearCommentsEl() {
    commentsEl.innerHTML = ""
}

///// Add comments section! ///// 
function addItemToCommentsSection(item) {
    let itemValue = item[1]

    let newEl = document.createElement("li") // create the li
    
    let fromEl = document.createElement("div")  // Creates From: Element
    fromEl.textContent = `From: ${itemValue.from}`
    fromEl.classList.add('fromEl')

    let messageEl = document.createElement("div")  // Creates Message Element
    messageEl.textContent = itemValue.message
    messageEl.classList.add('messageEl')

    let toEl = document.createElement("div")  // Creates To: Element
    toEl.textContent = `To: ${itemValue.to}`
    toEl.classList.add('toEl')

    newEl.append(toEl, messageEl, fromEl)
    if (commentsEl.firstChild) {  // places newest endorsement first
        commentsEl.insertBefore(newEl, commentsEl.firstChild);
    } else {
        commentsEl.append(newEl);
    }
}