'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');
var start = document.querySelector('#start');

function buttonsClickHandler(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  var number = element.dataset.number;
  var currentNumber = output.textContent;

  output.textContent = currentNumber === '0' ? number : currentNumber += number;
}

function startClickHandler(event) {
  var interval = setInterval(function() {
    var currentNumber = output.textContent;

    if(currentNumber === '0') {
      clearInterval(interval);
      return;
    }

    output.textContent = Number(currentNumber) - 1;
  }, 100);
}

buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
