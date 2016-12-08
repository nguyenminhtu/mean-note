var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var JWT_SECRET = 'tuhandsome';

Note = require('../models/note');

router.get('/', function(req, res, next) {
    var token = req.headers.author;
    var user = jwt.decode(token, JWT_SECRET);

    Note.find({ username: user.username }, function(err, notes) {
        res.json(notes);
    });
});

router.post('/add', function(req, res) {
    var token = req.headers.author;
    var user = jwt.decode(token, JWT_SECRET);

    var note = new Note({
        text: req.body.text,
        user: user._id,
        username: user.username
    });

    note.save(function(err, result) {
        res.json('ok');
    });
});

router.post('/remove', function(req, res) {
    Note.findOneAndRemove({ _id: req.body.note._id }, function(err, result) {
        res.json('ok');
    });
});

router.post('/edit/:id', function(req, res) {
    var id = req.params.id;
    Note.findOneAndUpdate({ _id: id },
        {$set: {text: req.body.text}},
        { safe: true, upsert: true },
        function(err, result) {
			if(err) {
				console.log(err);
			}else{
				res.json('ok');
			}
        });
});

module.exports = router;
