//caching the selectors for required elements into variables
//this helps with speed as the browser doesn't have to search entire DOM to locate element again and again
var button = document.querySelector("#enter");
var input = document.querySelector("#userinput");
var ul = document.querySelector("ul");
var listItems =  document.querySelectorAll("li");
//
function updatelistItems () {
    listItems =  document.querySelectorAll("li");
    return listItems;
}

//element.classList.toggle can be used to alternatively add/remove class
function toggleStrikeThrough() {
    this.classList.toggle("done"); //this

}

function inputLength () {
    return input.value.length; //returns how many characters are entered in input text field
}

function createListElement () {
    var li = document.createElement("li");//create element
    li.appendChild(document.createTextNode(input.value)); //text node for the li element
    ul.appendChild(li); //appending the created element onto ul element
    input.value = ""; // clear out the input after creating new entry in list

    //add delete button for every newly created list element
    var deleteButton = document.createElement("button");
    li.appendChild(deleteButton);
    deleteButton.appendChild(document.createTextNode("\u274C"));
    deleteButton.classList.add("delete-button");
}

function addListAfterClick() {
    if (inputLength() > 0){
        createListElement();
        updatelistItems();
        console.log(listItems);
        clickListenerForToggle();
        clickListenerForDeleteButton();
    }
}

function addListAfterEnter(Event) {
    if (inputLength()>0 && Event.keyCode === 13){ // keyCode 13 is for Enter
        createListElement();
        updatelistItems();
        console.log(listItems);
        clickListenerForToggle();
        clickListenerForDeleteButton();

    }
}

function deleteListItem(){
    var currentListElement = this.parentNode;//this returns the delete button
    currentListElement.parentNode.removeChild(currentListElement);//deleting currentListElement
} 

function clickListenerForDeleteButton() { //listItems is an array of all the <li> elements
    listItems.forEach( function(element,i) {  //here element is the <li> element
        element.children[0].addEventListener("click", deleteListItem); 
    }); //element.children[0] is the Delete button placed inside that list element    
}



function clickListenerForToggle() {
    //listItems is an array of all the li elements
    //adding listener for each array element
    listItems.forEach( function(element,i) {  
        element.addEventListener("click", toggleStrikeThrough ); 
    });
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterEnter);
