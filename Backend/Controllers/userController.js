const User = require('../models/User');
const jwt = require('jsonwebtoken');
let Signup = (req, res) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ "Success":true,'Message': 'user added successfully' });
        })
        .catch(err => {
            res.status(400).send({"Success":false,"Message":'adding new user failed' , err});
        });
}


let Login = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({ email: email })
        .then(user => {
            if (user.password == password) {

                let token = jwt.sign({
                    email: user.email,
                    _id: user._id,
                    role: user.role
                }, process.env.SECRET, { expiresIn: '1h'

                })
                res.status(200).json({"Success":true,user,token,  'Message': 'user logged in successfully' });
            }
            else {
                res.status(400).json({"Success":false, 'Message': 'user login failed' });
            }
        }
        )
        .catch(err => {
            res.status(400).json({ "Success":false,'Message': 'user login failed' });
        }
        );
}

module.exports = {
    Signup,
    Login
}





