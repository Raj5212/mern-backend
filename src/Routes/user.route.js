module.exports = (app) => {
    const userController = require('../controller/user.controller');

    // Create a new User
    app.post('/api/user/create', userController.create);

    // Retrieve a single User with userId
    app.get('/api/user/:userId', userController.findOne);

    // Update a User with userId
    app.put('/api/update/:userId', userController.update);

    // Delete a User with UserId
    app.delete('/api/delete/:userId', userController.delete);
}
