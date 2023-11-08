// External JavaScript
function handleMouseOver(event) {
  console.log('Mouseover');
  // TODO: change the text on mouseover to 'Thanks for hovering'.
  event.target.innerText = 'Thanks for Hovering';
}
 
// TODO: handle appropriate mouse event. when mouse leaves the button, change the label 'Mouseover here pls'
function handleMouseLeave(event) {
  console.log('Mouseover');
  event.target.innerText = "Mouseover here pls";
}

function handleChangeBgColor() {
  const divEl = document.getElementById('myDiv');
  console.dir(divEl);
  divEl.style.backgroundColor = 'red';
}

function handleChangeTextColor() {
  const divEl = document.getElementById('myDiv');
  console.dir(divEl);
  divEl.style.color = 'white';
}

function handleMakeTextBold() {
  const divEl = document.getElementById('myDiv');
  console.dir(divEl);
  divEl.style.fontWeight = 'Bold';
}

function handleShowTime() {
  var d = new Date();
  var hours = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var total = hours + ":" + min + ":" + sec;
  document.getElementById('timeWrapper').innerHTML = total;
}

function handleRandomNumber() {
  document.getElementById('randomNumber').innerHTML = Math.round(Math.random() * 10);
} 

function handleAddList() {
  // Reading entered value from the skillInput field
  let textval = document.getElementById('skillInput').value;
  // find out ul element
  let listNode = document.getElementById('skillList');
  // create li element
  let liNode = document.createElement('li');
  // insert text inside li element
  let txtNode = document.createTextNode(textval);
  // append the li element with text inside the ul
  liNode.appendChild(txtNode);
  listNode.appendChild(liNode);
}

function handleRemoveList() {
  document.getElementById('skillList').innerText = "";
}

function handleSavePin() {
  let textVal = document.getElementById('pinText').value;
  document.getElementById('pinCode').innerText = textVal;
  window.localStorage.setItem('pinCode', textVal);
  alert(' Pincode has been Saved');
}

function handleDeletePin() {
  let textVal = document.getElementById('pinCode');
  textVal.remove();
  window.localStorage.removeItem('pinCode');
}

function handleLocateMe() {
  // firing the permission screen
  navigator.geolocation.getCurrentPosition(locationAccessGranted, locationAccessDenied);
}

function locationAccessGranted(position) {
  console.log('inside locationAccessGranted');
  console.log(position);
  document.getElementById('latitude').innerText = position.coords.latitude;
  document.getElementById('longitude').innerText = position.coords.longitude;
}

function locationAccessDenied() {
  console.log('inside locationAccessDenied');
}

// Drag and Drop API Demo
function handleDragStart(event) {
  console.log('Started Dragging');
  console.log(event);
  event.dataTransfer.setData('draggedBox', event.target.id);
}

function handleDragOver(event) {
  console.log('Inside handleDragOver');
  // lets allow dropping by stopping the default nature of this event
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  console.log(event.dataTransfer.getData('draggedBox'));
  // Fetching the id of the element from dataTransfer
  const draggedElId = event.dataTransfer.getData('draggedBox');

  // appending the element inside droppable box
  document.getElementById('droppableBox').append(document.getElementById(draggedElId));
}

// Webworker Demo 
const first = document.querySelector('#number1');
const second = document.querySelector('#number2');
const result = document.querySelector('.result');

if (window.Worker) {
  console.log('Loading calc-worker.js');
  // loading a JS file in the background
  const calcWorker = new Worker("./assets/scripts/calc-worker.js");
  
  first.onchange = function () {
    calcWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function () {
    calcWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  // we are receiving the multiplied output sent by calc-worker.js 
  calcWorker.onmessage = function(event) {
    console.log(event.data);
    result.innerText = event.data;
  }
} else {
  console.log('Your browser doesn\'t support web workers.');
}

/*  Web Worker Ended */

/* Custom Components */
// Create a class for the element
class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('data-text');
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 36px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 32px;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

// Define the new element
customElements.define('popup-info', PopUpInfo);