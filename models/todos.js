const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    todo: String,
}, {collection : 'todos'});


module.exports = mongoose.model('todoModel', userSchema);