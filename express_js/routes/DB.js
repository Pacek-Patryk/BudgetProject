const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccountActions = require('../actions/account');
const authUser = require('../actions/authUser');

mongoose.connect('mongodb://mongodb:27017/budgetProject');

router.post('/checkuser', authUser.checkUser);
router.post('/register', authUser.register);
router.post('/login', authUser.login);

//create account
router.post('/account', AccountActions.postAccount);
//get all accounts
router.get('/accounts', AccountActions.getAccounts);
//delete account
router.delete('/account/:id', AccountActions.deleteAccount);
//create new transaction for account
router.post('/account/:id/transaction', AccountActions.postTransaction);
//get all transactions for account
router.get('/account/:id/transactions', AccountActions.getTransactions);
//delete transaction
router.delete('/account/:id/transaction', AccountActions.deleteTransaction);

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
