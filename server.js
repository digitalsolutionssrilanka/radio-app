const express       =    require('express'),
      mongoose      =    require('mongoose'),
      bodyParser    =    require('body-parser'),
      app           =    express();

mongoose.connect('mongodb+srv://admin:1234@radioappdb-5iq6o.mongodb.net/radioApp', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index.routes');
const songsRouter = require('./routes/song.routes');

app.use('/', indexRouter);
app.use('/songs', songsRouter);

app.listen(4000, function(){
    console.log('Server is running ...');
});