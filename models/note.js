var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    username: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

var Note = module.exports = mongoose.model('Note', noteSchema);