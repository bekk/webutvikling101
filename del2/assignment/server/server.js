var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var hyperstream = require('hyperstream');

var clientPath = path.join(__dirname, '..', 'client');

function insertResult(result) {
  return hyperstream({
    body: result.map(function(r) {
      return `<img src="${r.url}" alt="${r.title}" />`
    }).join('')
  });
}

var result = [
  {title: "someTitle", url: "someUrl"}
];

function handleRequest(request, response) {
  if(/^\/$/.test(request.url)) {

    fs.createReadStream(path.join(clientPath, 'index.html')).pipe(response);

  } else if(/^\/sok.html$/.test(request.url) && request.method === 'POST') {

    fs.createReadStream(path.join(clientPath, 'sok.html'))
      .pipe(insertResult(result))
      .pipe(response);

  } else if(/^\/sok$/ && request.method === 'POST') {

    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(result));
    response.end();

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
