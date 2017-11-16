var Router=require('koa-router');
var router=Router();

module.exports=routes=>{
  router.post('/postform',function(){
    console.log(this.request.body);
    this.body=this.request.body;
  });
  
  router.post('/upload',function(){
    console.log(this.request.body);
    this.body=this.request.body;
  });
  
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
  
  router.get('/fileUpload',function(){
    this.render('file_upload');
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

  return router;
}
