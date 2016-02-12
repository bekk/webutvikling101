'use strict';

let buttonsContainer = document.querySelector('.buttons');
let output = document.querySelector('#output');

buttonsContainer.addEventListener('click', function(event) {
  let element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  let number = element.dataset.number;
  let originalNumber = output.textContent;

  output.textContent = originalNumber === '0' ? number : originalNumber += number;
});
