const hapi = require('hapi');
const mongosee = require('mongoose');
const config = require('./configs')
const UserController = require('./controllers/UserController');
const server = hapi.server({
    port: config.server.port,
    host: config.server.host});

mongosee.connect(`mongodb://${config.db.user}:${config.db.password}@ds227594.mlab.com:27594/chohaisanvinhhien`);

mongosee.connection.once('open', ()=> {
    console.log(' conected to database')
});
// Add the route
server.route([
    {
        method:'GET',
        path:'/',
        handler:function(req, res) {
    
            return "Welcome to API for chohaisanvinhhien.vn"
        }
    },
    {
        method:'GET',
        path:'/api/v1/users',
        handler: UserController.getUsers
    },
    {
        method:'POST',
        path:'/api/v1/users',
        handler: UserController.addUsers
    },
    {
        method:'PUT',
        path:'/api/v1/users',
        handler: UserController.updateUser
    },
    {
        method:'DELETE',
        path:'/api/v1/users',
        handler: UserController.deleleUser
    },
    {
        method:'GET',
        path:'/api/v1/users/{id}',
        handler: UserController.detailUser
    },
]);

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();