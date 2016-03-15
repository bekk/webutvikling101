function getPhotos(tag) {
  return fetch('/sok?tag=' + tag).then(function(resp) {
    return resp.json();
  });
}

function renderImages(data) {
  var html = '';

  for (var i = 0; i < data.length; i++) {
    var img = data[i];
    html += `
      <figure>
        <a href="${window.location.pathname}/${i}">
          <img src="${img.url}" />
        </a>
        <figcaption>${img.title}</figcaption>
      </figure>
    `;
  }

  return html;
}

function router() {
  if (window.location.pathname === '/') {
    return;
  }

  var url = window.location.pathname.split('/');

  getPhotos(url[1]).then(function(data) {
    var html = renderImages(data);
    document.querySelector('main').innerHTML = html;
  });
}

router();

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  var tag = event.target.querySelector('input').value;
  window.location.pathname = '/' + tag;
});
