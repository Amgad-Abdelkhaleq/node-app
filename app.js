const express = require('express');
const path = require ('path');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');

// connect mongoose 
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;
db.once('open',function(){
console.log('connected to mongoDB');
});


db.on('error', function(err){
    console.log(err);
});


const app= express();

let Article = require('./models/article');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err);
       } else {
            res.render("index",{
                v:'articles',
                articles: articles
              });
        }

    });
});
app.get('/articles/add',function(req,res){
    res.render("add_articles",{
        v:'add_fucker_2' 
     });

});

// add submit post route 
app.post('/articles/add',function(req,res){
let article= new Article();
article.title=req.body.title;
article.author= req.body.author;
article.body=req.body.body;
article.save(function(err){
if (err) {
    console.log(err);
    return;
} else {
    res.redirect('/');
}

});
});

app.listen(3000,function(){
console.log('server started');
});