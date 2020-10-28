// globals
let selectedGlaze;
let selectedQuantity;
let addToCart;
let currQty = 0; //curr qty selected
let totalQty;

// sets totalQty if nothing currently exists
if(!localStorage.getItem("qty")){
  totalQty = 0;
}

// turns totalQty into int if string (aka when page is reloaded)
else if (!Number.isInteger(localStorage.getItem("qty"))){
  totalQty = parseInt(localStorage.getItem("qty")); // total qty counter
}

// sets totalQty to qty if already int
else if (Number.isInteger(localStorage.getItem("qty"))){
  totalQty = localStorage.getItem("qty"); // total qty counter
}

let numItems;
let cartArr = localStorage.getItem("cartItemsArr"); // total qty counter

function selectGlaze(curr){
  // if a glaze is already selected, reset background color (deselect it visually)
  if(selectedGlaze){
    selectedGlaze.style.backgroundColor="#fff";
  }
  curr.style.backgroundColor="#eef8ff";
  selectedGlaze = curr;

  if(selectedQuantity && !addToCart){
    triggerAddToCart();
  }
}

function selectQuantity(curr){
  // if a glaze is already selected, reset background color (deselect it visually)
  if(selectedQuantity){
    selectedQuantity.style.backgroundColor="#ffffff";
  }
  curr.style.backgroundColor="#eef8ff";
  selectedQuantity = curr;

  currQty = parseInt(curr.innerHTML);

  if(selectedGlaze && !addToCart){
    triggerAddToCart();
  }
}

function triggerAddToCart(){
  if (selectedGlaze && selectedQuantity){
    document.getElementById('addToCart').style.backgroundColor="#FBF19A";
    document.getElementById('addToCart').style.cursor="pointer";
    document.getElementById('addToCart').disabled=false;

    addToCart = true;
  }
}

function addCart(){
  totalQty += currQty;
  localStorage.setItem("qty", totalQty);
  document.getElementById("numItems").innerHTML = localStorage.getItem("qty") + "<br>";

}

// Tut on adding to list in localStorage
//   // Get the existing data
//   var existing = localStorage.getItem('myFavoriteSandwich');

//   // If no existing data, use the value by itself
//   // Otherwise, add the new value to it
//   var data = existing ? existing + ' and tuna' : 'tuna';

//   // Save back to localStorage
//   localStorage.setItem('myFavoriteSandwich', data);
//   console.log("DATA: ", localStorage.getItem('myFavoriteSandwich'))