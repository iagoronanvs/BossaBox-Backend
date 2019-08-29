const Routes = require('express').Router();

const AuthMiddleware = require('./app/middlewares/auth');

const DemoController = require('./app/controllers/demoController');
const AuthController = require('./app/controllers/authController');
const ToolController = require('./app/controllers/toolController');

Routes.get('/', DemoController.routeTest);
Routes.post('/auth', AuthController.auth);

Routes.post('/tools', AuthMiddleware, ToolController.insert);
Routes.get('/tools', AuthMiddleware, ToolController.getAll);
Routes.delete('/tools/:id', AuthMiddleware, ToolController.remove);

module.exports = Routes;