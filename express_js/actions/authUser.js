const user = require('../models/user');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'budget_project_secret', {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { userName: '', password: '' };

    if (err.message === 'incorrect username') {
        errors.userName = 'Username is incorrect';
        return errors;
    }

    if (err.message === 'incorrect password') {
        errors.password = 'Password is incorrect';
        return errors;
    }

    if (err.code === 11000) {
        errors.userName = 'User is already registered';
        return errors;
    }
    if (err._message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
};

class authUser {
    async checkUser(req, res) {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(
                token,
                'budget_project_secret',
                async (err, decodedToken) => {
                    if (err) return res.json({ status: false });
                    const currentUser = await user.findById(decodedToken.id);
                    if (currentUser)
                        return res.json({ status: true, user: user.userName });
                    else return res.json({ status: false });
                }
            );
        } else {
            return res.json({ status: false });
        }
    }

    async register(req, res) {
        try {
            const { userName, password } = req.body;

            const newUser = await user.create({ userName, password });
            const token = createToken(newUser._id);

            res.cookie('jwt', token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            return res.status(201).json({ user: newUser._id, created: true });
        } catch (error) {
            console.log(error);
            const errors = handleErrors(error);
            return res.status(500).json({ errors, created: false });
        }
    }

    async login(req, res) {
        try {
            const { userName, password } = req.body;

            const currentUser = await user.login(userName, password);
            const token = createToken(currentUser._id);

            res.cookie('jwt', token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            return res
                .status(200)
                .json({ user: currentUser._id, created: true });
        } catch (error) {
            console.log(error);
            const errors = handleErrors(error);
            return res.status(500).json({ errors, created: false });
        }
    }
}

module.exports = new authUser();
