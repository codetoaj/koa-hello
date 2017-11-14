var koa=require('koa');
var app=new koa();
var Router=require('koa-router');
var router=Router();
var session = require('koa-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Pug = require('koa-pug');
var pug = new Pug({
   viewPath: './views',
   basedir: './views',
   app: app //Equivalent to app.use(pug)
});

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

router.get('/auth/local',function(){
  passport.authenticate('local', function(err,user,info){
    console.log('inside local auth');
  })
});

router.get('/',function(){
  this.body="koa home";
});


router.get('/login',function(){
  this.render('login');
});

router.get('/about',function(){
  this.body="about koa";
});

router.get('/welcome/:name',function(){
  this.session.name=this.params.name;
  this.body="welcome:"+this.params.name+" Session created";
});

router.get('/accesspage',function(){
  if(this.session.name){
    this.body=this.session.name+' you accessed this page';
  }else{
    this.redirect('/accesserr');
  }
});

router.get('/logout',function(){
  this.session.name=null;
});

router.get('/accesserr',function(){
  this.body='You can\'t access this page without login';
});

router.get('/id/:id([0-9]{5})',function(){
  this.body="userid:"+this.params.id;
});

router.get('/visit',function(){
  var n = this.session.views || 0;
  this.session.views = ++n;
  if(n === 1)
     this.body = 'Welcome here for the first time!\n'+this.session.name;
  else
     this.body = "You've visited this page " + n + " times!\n"+this.session.name;
});

router.get('*',function(){
  this.body="Page not found";
});

app.keys = ['amalanrocks'];
app.use(session(app));
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,function(){
  console.log('Server running started');
});