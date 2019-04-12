const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Postdb = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://Alan:56R4sHSfPlcKQjAY@cluster0-uz5ne.gcp.mongodb.net/node-angualr?retryWrites=true", { useNewUrlParser: true })
   .then(() => {
     console.log('Connection to database Succesful!');
   })
   .catch(() => {
     console.log('Connection failed!!');
   });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-control-Allow-Origin", "*");
  res.setHeader(
    "Access-control-Allow-Headers",
    "Orign, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Postdb({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  console.log("Added!")
  res.status(201).json({
    message: 'Post added successfuly!',
    postId: post._id

  });
});

app.get('/api/posts', (req, res, next) => {
  Postdb.find().then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
      console.log(documents);
    });


});

app.delete("/api/posts/:id", (req, res, next) => {
  Postdb.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!"});
  });

});

module.exports = app;




