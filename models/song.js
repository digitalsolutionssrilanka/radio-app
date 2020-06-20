const mongoose      =    require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
    link: String
});

module.exports = mongoose.model('Song', songSchema);