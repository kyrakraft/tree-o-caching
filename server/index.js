const express = require ('express');
const path = require ('path');
const bodyParser = require('body-parser');

const app = express();
const Tree = require('./models').Tree;
const User = require('./models').User;
const Item = require('./models').Item;

const mongoose = require('mongoose');
mongoose.connection.on('connected', function(){
  console.log('Connected to MongoDb!')
});
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.get('/viewMap', function(req, res){
  Tree.find({}, function(err, trees){
    if (err){
      console.log(err);
    } else {
      console.log(trees);
      res.json(trees);
    }
  })
})

//find Tree in MongoDB using known latitude and longitude
//ex. fetch get request to "/viewTree/id=123456"
app.get('/viewTree', function(req, res){
  Tree.findById(req.query.id, function(err, tree){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(tree.items);
      res.json(tree.items);
    }
  })
});

//returns user's items from MongoDB
//ex. fetch get request to "/viewTree/addItems?id=12345"
app.get('/viewTree/addItems', function(req, res){
  User.findById(req.query.id, function(err, user){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(user.items);
      res.json(user.items);
    }
  });
});

app.get('/viewTree/takeItems', function(req, res){
  Tree.findById(req.query.id, function(err, tree){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(tree.items);
      res.json(tree.items);
    }
  });
});

app.post('/viewTree/addItem', function(req, res){
  User.findById(req.query.userId, function(err, user){
    if(err){
      console.log(err);
    } else {
      var newItems = user.items;
      var foundIndex = newItems.findIndex((itemId) => {
        return itemId == req.query.itemId
      });
      console.log(foundIndex);
      delete newItems[foundIndex];
      console.log(newItems);
      User.findByIdAndUpdate(req.query.userId, {
        items: newItems
      },function(err, user){
        if(err){
          console.log(err);
        } else {
          console.log(user);
          Item.findByIdAndUpdate(req.query.itemId, {
            tree: req.query.treeId,
            user: null,
          }, function(err, item){
            if(err){
              console.log(err);
            } else {
              console.log(item);
              Tree.findById(req.query.treeId, function(err, tree){
                if(err){
                  console.log(err);
                } else {
                  console.log(tree);
                  var newItems = tree.items;
                  console.log(newItems);
                  for (var i = 0; i < newItems.length; i++){
                    console.log(newItems[i]);
                    console.log(newItems[i] == null);
                    if (newItems[i] == null){
                      delete newItems[i];
                    }
                  }
                    console.log(newItems);
                    newItems.push(req.query.itemId);
                    Tree.findByIdAndUpdate(req.query.treeId, {
                      items: newItems
                    }, function(err, tree){
                      if(err){
                        console.log(err)
                      } else {
                        res.redirect('/viewTree?id=' + tree._id);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
});

app.post('/viewTree/takeItem', function(req, res){
  Tree.findById(req.query.treeId, function(err, tree){
    if(err){
      console.log(err);
    } else {
      var newItems = tree.items;
      var foundIndex = newItems.findIndex((itemId) => {
        return itemId == req.query.itemId
      });
      console.log(foundIndex);
      delete newItems[foundIndex];
      Tree.findByIdAndUpdate(req.query.treeId, {
        items: newItems,
      }, function(err, tree){
        if(err){
          console.log(err);
        } else {
          console.log(tree);
          Item.findByIdAndUpdate(req.query.itemId, {
            tree: null,
            user: req.query.userId,
          }, function(err, item){
            if(err){
              console.log(err);
            } else {
              console.log(item);
              User.findById(req.query.userId, function(err, user){
                if(err){
                  console.log(err);
                } else {
                  console.log(user);
                  var newItems = user.items;
                  for (var i = 0; i < newItems.length; i++){
                    if (newItems[i] == null){
                      delete newItems[i];
                    }
                  }
                  newItems.push(req.query.itemId);
                  User.findByIdAndUpdate(req.query.userId, {
                    items: newItems
                  }, function(err, user){
                    if(err){
                      console.log(err);
                    } else {
                      res.redirect('/viewTree?=id' + req.query.treeId);
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});

app.post('/addTree', function(req, res){
  var tree = new Tree({
    latitude: req.query.latitude,
    longitude: req.query.longitude,
    items: req.query.item, //item id
  });
  tree.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/viewTree?id=' + tree._id);
    }
  })
})

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
