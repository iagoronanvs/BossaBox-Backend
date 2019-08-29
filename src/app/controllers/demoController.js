const sequelize = require('../../database/connection');

class DemoController {
    async routeTest(req, res) {
        const conn = await sequelize.authenticate();
        res.send('Olá Mundo!');
    }
}

module.exports = new DemoController();