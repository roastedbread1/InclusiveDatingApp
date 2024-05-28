/* eslint-disable prettier/prettier */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();

const port = 6969;
const cors = require('cors');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.qn88rwl.mongodb.net/')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const User = require('./models/user');

app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    if (userData.dateOfBirth) {
      const [day, month, year] = userData.dateOfBirth.split('/');
      userData.dateOfBirth = new Date(`${year}-${month}-${day}`);
    }

    const newUser = new User(userData);

    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({userId: newUser._id}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    console.log('Error creating user', error);
    res.status(500).json({error: 'internal server error'});
  }
});

//fetch users data

app.get('/users/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({message: 'User not found'});
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: 'internal server error'});
    console.log('Error fetching user data', error);
  }
});

//login endpoint

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({error: 'Invalid Email'});
    }
    if (user.password !== password) {
      return res.status(401).json({error: 'Invalid Password'});
    }

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({userId: user._id}, secretKey);

    return res.status(200).json({token});
  } catch (error) {
    res.status(500).json({error: 'Error logging in user'});
    console.log('Error', error);
  }
});

//matches

app.get('/matches', async (req, res) => {
  try {
    const {userId} = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    let filter = {};
    if (user.gender === 'Male') {
      filter.gender = 'Female';
    } else if (user.gender === 'Female') {
      filter.gender = 'Male';
    }

    let query = {
      _id: {$ne: userId},
    };

    if (user.type) {
      filter.type = user.type;
    }

    const currentUser = await User.findById(userId)
      .populate('matches', '_id')
      .populate('likedProfiles', '_id');

    const friendsIds = currentUser.matches.map(friend => friend._id);

    const likedIds = currentUser.likedProfiles.map(like => like._id);

    const matches = await User.find(filter)
      .where('_id')
      .nin([userId, ...friendsIds, ...likedIds]);

    return res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({error: 'internal server error'});
    console.log('Error fetching matches', error);
  }
});
