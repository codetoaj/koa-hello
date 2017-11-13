var koa=require('koa');
var app=new koa();
var Router=require('koa-router');
var router=Router();
var session = require('koa-session');

router.get('/',function(){
  this.body="koa home";
});
router.get('/about',function(){
  this.body="about koa";
});
router.get('/welcome/:name',function(){
  this.session.name=this.params.name;
  this.body="welcome:"+this.params.name+" Session created";
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