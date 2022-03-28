const account = require('../models/account');

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
        req = req.body;
        transaction = {
            category: req.category,
            amount: req.amount,
            date: new Date(),
        };
        try {
            const addTransaction = await account.findOne({
                _id: req.params.id,
            });

            addTransaction.transaction.push(transaction);

            await addTransaction.save();
            return res.status(200).json(addTransaction);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }
}

module.exports = new Account();
