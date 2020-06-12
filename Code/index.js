const express = require('express');
const app = express();
const { router } = require('./routes')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const passport = require('passport');
const cookieSession = require('cookie-session')
const { cookieSecret } = require('./constants/constants')
const cors = require('cors');
const methodOverride = require('method-override')

var cookieParser = require('cookie-parser');

app.use(methodOverride('_method'))
app.use(cookieParser())

app.use(cors());

app.use(express.static(__dirname + '/public/css'));
app.use( express.static((__dirname +  '/public/scripts/' )) );
app.use( express.static( "public" ) );
express.urlencoded({ extended: false })
require('dotenv').config()

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys:[cookieSecret]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public', 'usuarioImg'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
   
// const upload = multer({ storage: storage })


app.use('/', router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });