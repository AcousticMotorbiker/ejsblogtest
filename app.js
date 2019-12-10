//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lime and limpid green, a second scene A fight between the blue you once knew. Floating down, the sound resounds Around the icy waters underground. Jupiter and Saturn, Oberon, Miranda and Titania. Neptune, Titan, Stars can frighten";
const aboutContent = "Nobody knows where you are, how near or how far. Shine on you crazy diamond. Pile on many more layers and I'll be joining you there. Shine on you crazy diamond. And we'll bask in the shadow of yesterday's triumph, sail on the steel breeze. Come on you boy child, you winner and loser, come on you miner for truth and delusion, and shine "
const contactContent = "Gerhard den Hollander";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(4444, () => {
  console.log("Server started on port 4444");
});
