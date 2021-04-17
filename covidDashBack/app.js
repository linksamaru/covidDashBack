let express = require('express');
let path = require('path');
global.SERVER_ROOT_PATH = path.resolve(__dirname);
global.COLORS = require(SERVER_ROOT_PATH + '/lib/utils').colores;
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require(SERVER_ROOT_PATH + '/routes/index');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next) => {
    ((new (require(SERVER_ROOT_PATH + '/lib/auth'))(process.env.SECRET)).testKey(req.headers.apikey))
        .then(() => { next(); })
        .catch(() => {res.status(401).send('incorrect aipKey'); });
});
app.use('/', indexRouter);

module.exports = app;
