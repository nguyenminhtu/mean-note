var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var JWT_SECRET = 'tuhandsome';

User = require('../models/user');

router.post('/register', function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            var user = new User({
                username: req.body.username,
                password: hash
            });
            user.save(function(err, result) {
                res.json('ok');
            });
        });
    });
});

router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
            res.json('No User Found');
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (!result) {
                    res.json('Wrong password. Try again!');
                } else {
                    var token = jwt.encode(user, JWT_SECRET);
                    res.json({ token: token });
                }
            });
        }
    });
});

router.get('/check/:username', function (req,res) {
    var username = req.params.username;
    User.findOne({ username: username }, function (err, user) {
        if(user){
            res.json('match');
        }else{
            res.json('notMatch');
        }
    });
});

module.exports = router;
