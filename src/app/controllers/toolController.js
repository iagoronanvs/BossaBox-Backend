const { Tool } = require('../../database/models');
const sequelize = require('../../database/connection');

class ToolController {
    async insert(req, res) {
        try {
            const { body } = req;
            const tool = await Tool.create(body);
            return res.status(201).send(tool);
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    async getAll(req, res) {
        try {
            const { tag } = req.query;            
            if (tag) {
                const query = `SELECT * FROM "Tools" WHERE "tags" @> ARRAY['${tag}']`;
                sequelize.query(query).then(([results, metadata]) => {
                    return res.send(results);
                });    
            } else {
                const tools = await Tool.findAll();
                return res.send(tools);
            }            
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;
            const tool = await Tool.findByPk(id);

            if (tool == null) throw 400;

            Tool.destroy({
                where: { id },
            });

            return res.status(204).send();
        } catch (e) {
            return res.status(400).send(e);
        }
    }
}

module.exports = new ToolController();