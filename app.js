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
var jwt = require('jsonwebtoken');
var moment = require('moment');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);

var User = require('./models/User.js');

//Routes App
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
// var chatsRouter = require('./routes/chats'); TO DO: probleme sur le Shema.Type
var forumRouter = require('./routes/forum');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('new-message', message => socket.broadcast.emit('show-message', message));
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
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'changethis',
    resave: false,
    saveUninitialized: false
}));

//Passport authentification
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// TEST TOKEN
const test = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
];

app.get('/test', authenticateToken, (req, res) => {
    res.json(test.filter(test => test.username === req.user.name))
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = {name: username};

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}

// Middleware
app.use((req, res, next) => {
    res.locals.user = req.user;
    moment.locale('fr');
    res.locals.moment = moment;
    next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
// app.use('/chats', chatsRouter);
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
