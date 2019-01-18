const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');

const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

const middlewareOptions = {
  stats: {colors: true},
  noInfo: true,
  publicPath: '/dist/'
}

app.use(webpackDevMiddleware(webpack(webpackConfig), middlewareOptions));
app.use('/public/styles', lessMiddleware('./public/styles'));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(lessMiddleware(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'dist')));

app.use('/public/styles', express.static('./public/styles'));
app.use('/public/scripts', express.static('./public/scripts'));

app.get('/*', function(req, res, next) {
  res.send(generateHtml());
});

const generateHtml = () => {
  return `<!doctype html>
  <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">
        <link rel="stylesheet" href="./public/styles/style.css"/>
        <title>Hello World</title>
    </head>
    <body>
      <div id="content"></div>
      <script type="text/javascript" src="/dist/bundle.js"></script>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js" integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous"></script>
      <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
      <script>$(document).ready(function() { $('body').bootstrapMaterialDesign(); });</script>
    </body>
  </html>`
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
