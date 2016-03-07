function getPhotos(tag) {
  return fetch('/sok?tag=' + tag).then(function(resp) {
    return resp.json();
  });
}

function renderImages(data) {
  var html = '';
  data.forEach(function(img, index) {
    html += `
      <figure>
        <a href="${window.location.pathname}/${index}">
          <img src="${img.url}" />
        </a>
        <figcaption>${img.title}</figcaption>
      </figure>
    `
  });

  return html;
}

function renderOneImage(img) {
  return `
    <figure class="fullwidth">
      <img src="${img.url}" />
      <figcaption>${img.title}</figcaption>
    </figure>
  `;
}

function router() {
  if(window.location.pathname === '/') {
    return;
  }

  var url = window.location.pathname.split('/');
  getPhotos(url[1]).then(function(data) {
    var index = Number(url[2]);
    var html;

    if (!isNaN(index)) {
      html = renderOneImage(data[index]);
    } else {
      html = renderImages(data);
    }

    document.querySelector('main').innerHTML = html;
  });
}

router();

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  var tag = event.target.querySelector('input').value;
  window.location.pathname = '/' + tag;
});
