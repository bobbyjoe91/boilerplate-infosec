'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';















































module.exports = app;
const api = require('./server.js');
const helmet = require("helmet");

// remove x-powered-by
app.use(helmet.hidePoweredBy());

// prevent clickjacking
app.use(
  helmet.frameguard({ action: 'deny' })
);

// add XSS filter
app.use(
  helmet.xssFilter()
);

// avoid response MIME type sniffing
app.use(
  helmet.noSniff()
);

// avoid IE to open untrusted HTML
app.use(
  helmet.ieNoOpen()
);

// force use HTTPS
const hstsOptions = {
  force: true,
  maxAge: 90 * 24 * 3600,
};
app.use(
  helmet.hsts(hstsOptions)
);

// disable DNS prefetch
app.use(
  helmet.dnsPrefetchControl()
);

// disable cache
app.use(
  helmet.noCache()
);

// apply CSP
const cspOption = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com'],
  },
};
app.use(
  helmet.contentSecurityPolicy(cspOption)
);

app.use(express.static('public'));
app.disable('strict-transport-security');

app.use('/_api', api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
