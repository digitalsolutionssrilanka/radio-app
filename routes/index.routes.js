const { PassThrough } = require('stream');

const   express = require('express'),
        router  = express.Router(),
        fs      = require('fs');
        Throttle = require('throttle'),
        ffprobe = require('ffprobe'),
        ffprobeStatic = require('ffprobe-static'),

console.log('passing cp 1');

// Get all songs from db
router.get('/', function(req, res){

  const responseSink = PassThrough();
  const writables = [];

  const bitRate = ffprobe('myAudio.mp3', { path: ffprobeStatic.path }, function(err, info){
    console.log(info.streams[0].bit_rate);
  });

  const readable = fs.createReadStream('myAudio.mp3');
  const throttle = new Throttle(bitRate / 8);
  writables.push(responseSink);

  readable.pipe(throttle).on('data', (chunk) => {
      for(const writable of writables) {
          writable.write(chunk);
      }
  });

});

// // Show login form
// router.get('/login', function(req, res){
//     res.render('login.ejs');
// });

module.exports = router;