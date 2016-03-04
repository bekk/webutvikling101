function getPhotos(tag) {
  return fetch('/sok?tag=' + tag).then(function(resp) {
    return resp.json();
  });
}

function renderImages(data) {
  return data.map(function(img, index) {
    return `
      <figure>
        <img src="${img.url}" />
        <figcaption>${img.title}</figcaption>
      </figure>
    `}).join('');

}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  var tag = event.target.querySelector('input').value;

  getPhotos(tag).then(function(data) {
    html = renderImages(data);
    document.querySelector('main').innerHTML = html;
  });
});
