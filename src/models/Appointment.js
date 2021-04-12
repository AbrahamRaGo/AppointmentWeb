const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentSchema = new Schema({
    name: { type: String, require: true },
    mail: { type: String, require: true },
    service: { type: String, require: true },
    date: { type: Date, require: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);