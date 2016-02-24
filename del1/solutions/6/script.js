'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');

buttonsContainer.addEventListener('click', function(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  var number = element.dataset.number;
  var originalNumber = output.textContent;

  output.textContent = originalNumber === '0' ? number : originalNumber += number;
});
