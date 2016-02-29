var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');
var qs = require('querystring');

var hyperstream = require('hyperstream');
var Flickr = require('node-flickr');

var flickr = new Flickr({'api_key': 'ea97a6690f90a628b60e2fd79012c74c'});

var clientPath = path.join(__dirname, '..', 'client');

function insertResult(result) {
  return hyperstream({
    body: result
      .map(function(r) {
        return `<img src="${r.url}" alt="${r.title}" />`
      })
      .join('')
  });
}

function transformResult(result) {
  return result.photos.photo.map(function(r) {
    return {
      url: `https://farm${r.farm}.staticflickr.com/${r.server}/${r.id}_${r.secret}.jpg`,
      title: r.title
    };
  });
}

function handleError(err, response) {
  console.error(err);

  response.statusCode = 500;
  response.write(err);
  response.end();
}

function handleSok(request, response, handler) {
  var data = '';

  request.on('data', function(chunk) {
    data += chunk;
  });

  request.on('end', function() {
    data = qs.parse(data);

    flickr.get('photos.search', {'tags': data.sok, 'per_page': 15}, handler);
  });
}

var result = [
  {title: 'someTitle', url: 'someUrl'}
];

function handleRequest(request, response) {
  if(/^\/$/.test(request.url)) {

    fs.createReadStream(path.join(clientPath, 'index.html')).pipe(response);

  } else if(/^\/sok.html$/.test(request.url) && request.method === 'POST') {

    handleSok(request, response, function(err, result) {
      if(err) {
        handleError(err, response);
      }

      fs.createReadStream(path.join(clientPath, 'sok.html'))
      .pipe(insertResult(transformResult(result)))
      .pipe(response);
    });

  } else if(/^\/sok$/ && request.method === 'POST') {

    handleSok(request, response, function(err, result) {
      if(err) {
        handleError(err, response)
      }

      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(transformResult(result)));
      response.end();
    });

  } else {

    var file = path.join(clientPath, request.url);
    try{
      fs.statSync(file);
      fs.createReadStream(file).pipe(response);
    } catch(e) {
      response.statusCode = 404;
      response.end();
    }

  }
}

var server = http.createServer(handleRequest);

server.listen(5000);
