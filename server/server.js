var koa=require('koa');
var app=new koa();
var Router=require('koa-router');
var router=Router();
var routes=require('./routes')(router);
var session = require('koa-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Pug = require('koa-pug');
var bodyParser = require('koa-bodyparser');

var pug = new Pug({
   viewPath: './views',
   basedir: './views',
   app: app //Equivalent to app.use(pug)
});

app.use(bodyParser({
  formidable:{uploadDir: './uploads'},
  multipart: true,
  urlencoded: true
}));

passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log(email);
    console.log(password);
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
    return done(null,null);
  }
));

app.keys = ['amalanrocks'];
app.use(session(app));
app.use(routes.routes());
// app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,function(){
  console.log('Server running started');
});