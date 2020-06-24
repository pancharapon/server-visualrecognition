const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const Signin = require('./Controllers/Signin');
const Register = require('./Controllers/Register');
const Profile = require('./Controllers/Profile');
const Image = require('./Controllers/Image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'pancharapon',
    password : '',
    database : 'anonymouse'
  }
});

db.select('*').from('users').then(response => console.log(response))

//Middleware
app.use(express.json());
app.use(cors())

// GET ROOT
app.get('/', (req, res) => { res.send('Working!!') }) 
//Siginin
app.post('/signin', (req, res) => { Signin.handleSignin(req, res, db, bcrypt) })
//Register
app.post('/register', (req, res) => { Register.handleRegister(req, res, db, bcrypt) })
//Profile
app.get('/profile/:id', (req,res) => { Profile.handleProfile(req, res, db) })
//Image
app.put('/image', (req,res) => { Image.handleImage(req, res, db) })
//Image API call
app.post('/imageapi', (req,res) => { Image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
});