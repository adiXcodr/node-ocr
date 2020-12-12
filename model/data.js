const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// {"name":"AN","email":"abcd@gmail.com","key":"43f28f2bf6c0a96db422"}
const dataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    key: {type: String, required: true, unique: true},
});

dataSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Data', dataSchema);