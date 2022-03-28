const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccountActions = require('../actions/account');

mongoose.connect('mongodb://mongodb:27017/budgetProject');

//get all accounts
router.get('/accounts', AccountActions.getAccounts);
//create account
router.post('/account', AccountActions.postAccount);
//delete account
router.delete('/account/:id', AccountActions.deleteAccount);
//create new transaction for account
router.post('/account/:id/transaction', AccountActions.postTransaction);

//connect with db
router.get('/', function (req, res, next) {
    res.send(databaseConnection);
});

let databaseConnection = 'Waiting for Database response...';

mongoose.connection.on('error', (error) => {
    console.log('Database connection error:', error);
    databaseConnection = 'Error connecting to Database';
});

mongoose.connection.once('open', () => {
    console.log('Connected to Database!');
    databaseConnection = 'Connected to Database';
});

module.exports = router;
