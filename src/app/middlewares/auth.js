const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var token = req.headers.token;
    if (!token) return res.status(401).send({ error: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(401).send({ error: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
}