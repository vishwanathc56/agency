const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
    "agencyId": {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agencys'
    },
    "name": {
        required: true,
        type: String,
        required: [true, 'client Name is required']

    },
    "email": {
        required: true,
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Email validation regular expression
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    "phoneNumber": {
        required: true,
        type: Number,
        required: [true, 'Phone Number is required']
    },
    "totalBill": {
        required: true,
        type: Number,
        required: [true, 'totalBill is required']
    },
})
const Client = mongoose.model('Clients', ClientSchema);

module.exports = Client;