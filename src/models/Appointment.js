const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentSchema = new Schema({
    nameClient: { type: String, require: true },
    emailClient: { type: String, require: true },
    service: { type: String, require: true },
    date: { type: String, require: true },
    time: {type: String, require: true}
});

module.exports = mongoose.model('Appointment', AppointmentSchema);