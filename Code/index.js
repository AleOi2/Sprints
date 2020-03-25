const express = require('express');
const app = express();
const { router } = require('./routes')

app.use(express.static(__dirname + '/public/css'));
app.use( express.static((__dirname +  '/public/scripts/' )) );
app.use( express.static( "public" ) );
express.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app
app.use('/', router);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });