const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../database/models');

class AuthController {    
    async auth(req, res) {
        try {
            const { email, pwd } = req.body;

            if (!email || !pwd) return res.status(400).send({error: 'Invalid credentials.'});
            
            const user = await User.findOne({ where: {email} });        
            if (!user) return res.status(400).send({error: 'User not found.'});

            const equals = bcrypt.compareSync(pwd, user.pwd);
            if (!equals) return res.status(400).send({error: 'Invalid credentials.'});

            const token = jwt.sign({id: user.id}, process.env.SECRET);
            return res.send({ token });
        } catch (e) {
            return res.status(400).send(e);
        }
    }
}

module.exports = new AuthController();