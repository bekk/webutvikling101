document.querySelector('.buttons').addEventListener('click', function(e) {
  var el = e.target;
  if(el.nodeName === 'BUTTON') {
    var text = el.dataset.number;
    var output = document.querySelector('output');
    var num = output.textContent;
    output.textContent = num === '0'? text : output.textContent += text;
  }
});

document.querySelector('#start').addEventListener('click', function(e) {
  var interval = setInterval(function() {
    var output = document.querySelector('output');
    var num = output.textContent;
    if(num === '0') {
      clearInterval(interval);
      return;
    }
    output.textContent = parseInt(num, 10) - 1;
  }, 1000);
});
