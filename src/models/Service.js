const mongoose = require('mongoose');
const {Schema} = mongoose;

const ServiceSchema = new Schema({
    service: { type: String, require: true },
    cost: { type: Number, require: true },
    description: { type: String }
});

module.exports = mongoose.model('Service', ServiceSchema);