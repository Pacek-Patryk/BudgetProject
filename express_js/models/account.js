const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        default: 0,
    },
    transaction: [
        {
            category: {
                type: String,
            },
            minus: {
                type: Boolean,
            },
            amount: {
                type: Number,
            },
            date: {
                type: Date,
            },
        },
    ],
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
