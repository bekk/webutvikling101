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
        <img src="${img.url}" />
        <figcaption>${img.title}</figcaption>
      </figure>
    `
  });

  return html;
}

getPhotos('bekk').then(function(data) {
  html = renderImages(data);
  document.querySelector('main').innerHTML = html;
});
