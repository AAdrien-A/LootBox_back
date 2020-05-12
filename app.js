require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var moment = require('moment');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);

var User = require('./models/User.js');

//routes App
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var chatsRouter = require('./routes/chats');
var forumRouter = require('./routes/forum');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('new-message', message => socket.broadcast.emit('show-message', message));
});

// middleware all requests from all origins to access API.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
//router handler for images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'changethis',
    resave: false,
    saveUninitialized: false
}));

//passport authentification
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware fuseaux horaires
app.use((req, res, next) => {
    res.locals.user = req.user;
    moment.locale('fr');
    res.locals.moment = moment;
    next();
});

// used routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/chats', chatsRouter);
app.use('/forum', forumRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
