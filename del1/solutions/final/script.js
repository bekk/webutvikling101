'use strict';

let buttonsContainer = document.querySelector('.buttons');
let output = document.querySelector('#output');
let start = document.querySelector('#start');

function buttonsClickHandler(event) {
  let element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  let number = element.dataset.number;
  let currentNumber = output.textContent;

  output.textContent = currentNumber === '0' ? number : currentNumber += number;
}

function startClickHandler(event) {
  let interval = setInterval(function() {
    let currentNumber = output.textContent;

    if(currentNumber === '0') {
      clearInterval(interval);
      return;
    }

    output.textContent = Number(currentNumber) - 1;
  }, 100);
}

buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
