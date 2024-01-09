const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

let Signup = async (req, res) => {
    try {
        // Validate input data (you can add more validation as needed)
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ "Success": false, 'Message': 'Invalid input data' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        let user = new User({
            email: req.body.email,
            password: hashedPassword,
            // Add other properties as needed
        });

        await user.save();
        res.status(200).json({ "Success": true, 'Message': 'User added successfully' });
    } catch (err) {
        res.status(400).json({ "Success": false, "Message": 'Adding new user failed', err });
    }
}

let Login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        const user = await User.findOne({ email: email });

        if (user && await bcrypt.compare(password, user.password)) {
            // Passwords match, generate JWT token
            let token = jwt.sign({
                email: user.email,
                _id: user._id,
                role: user.role
            }, process.env.SECRET, { expiresIn: '1h' });

            res.status(200).json({ "Success": true, user, token, 'Message': 'User logged in successfully' });
        } else {
            res.status(400).json({ "Success": false, 'Message': 'User login failed' });
        }
    } catch (err) {
        res.status(400).json({ "Success": false, 'Message': 'User login failed', err });
    }
}

module.exports = {
    Signup,
    Login
};
