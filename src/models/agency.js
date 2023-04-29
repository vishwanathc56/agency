const mongoose = require('mongoose');
const AgencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    address1: {
        type: String,
        required: [true, 'Address1 is required']
    },
    address2: {
        type: String,
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone Number is required']
    },
});
module.exports = mongoose.model('Agencys', AgencySchema);