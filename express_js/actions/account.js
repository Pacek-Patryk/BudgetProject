const account = require('../models/account');
const mongoose = require('mongoose');

class Account {
    async getAccounts(req, res) {
        let received;
        try {
            received = await account.find({});
            return res.status(200).json(received);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }

    async postAccount(req, res) {
        req = req.body;
        const newAccount = new account({
            name: req.name,
        });

        try {
            await newAccount.save();
            return res.status(200).json(newAccount);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }

    async deleteAccount(req, res) {
        try {
            await account.deleteOne({ _id: req.params.id });
            return res.status(200).json(req.params.id);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }

    async postTransaction(req, res) {
        // category: req.category,
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        var amount = Number(req.body.amount);
        var minus = req.body.minus;
        const transaction = {
            amount: amount,
            minus: minus,
            date: today,
        };

        try {
            const addTransaction = await account.findById(req.params.id);
            if (req.body.minus) addTransaction.amount -= amount;
            else addTransaction.amount += amount;

            addTransaction.transaction.push(transaction);

            await addTransaction.save();
            return res.status(200).json(addTransaction);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }

    async getTransactions(req, res) {
        let received;
        try {
            received = await account.findById(req.params.id);
            return res.status(200).json(received.transaction);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }

    async deleteTransaction(req, res) {
        let received;

        try {
            received = await account.findById(req.params.id);

            const i = received.transaction.findIndex(
                (element) => element._id == req.body._id
            );

            if (received.transaction[i].minus)
                received.amount += received.transaction[i].amount;
            else received.amount -= received.transaction[i].amount;

            received.transaction.splice(i, 1);
            await received.save();
            return res
                .status(200)
                .json({ accountAmount: received.amount, index: i });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }
}

module.exports = new Account();
