const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  items: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Item',
  },
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  items: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Item',
  }
});

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
  },
  img: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  tree: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tree',
  }
})

const Tree = mongoose.model('Tree', TreeSchema);
const User = mongoose.model('User', UserSchema);
const Item = mongoose.model('Item', ItemSchema);

module.exports = {
  Tree: Tree,
  User: User,
  Item: Item,
};
