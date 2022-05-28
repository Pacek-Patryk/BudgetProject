const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (userName, password) {
    const user = await this.findOne({ userName: userName });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        else throw Error('incorrect password');
    } else throw Error('incorrect username');
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
