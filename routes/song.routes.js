const   express = require('express'),
        app     = express(),
        router  = express.Router(),
        Song    = require('../models/song'),
        bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Get all songs from db
router.get('/', function(req, res){
    Song.find({}, function(err, songs){
        if(err){
            res.render('dashboard.ejs')
                .then(alert("Couldn't load all songs page, please try again!"));
        }else{
            res.render('all-songs.ejs', { songs: songs });
        }
    });
});

router.get('/new', function(req, res){
    //show add new song form
    res.render('add-song.ejs');
});

router.post('/new', function(req, res){
    //add song to database
    Song.create(req.body.song, function(err, newSong){
        if(err){
            res.render('add-song.ejs')
                .then(alert("Couldn't add song, please try again!"));
        }else{
            res.redirect('/songs');
        }
    });
});

module.exports = router;