/* eslint-disable no-console */
const hapi = require('hapi');
const mongosee = require('mongoose');
const config = require('./configs');
const UserController = require('./controllers/UserController');
const CateController = require('./controllers/CateController');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');


const server = hapi.server({
	port: config.server.port,
	host: config.server.host,
	routes: {cors: true}
});

mongosee.connect(`mongodb://${config.db.user}:${config.db.password}@ds227594.mlab.com:27594/chohaisanvinhhien`);

mongosee.connection.once('open', ()=> {
	console.log(' conected to database');
});


// Add the route
server.route([
	{
		method:'GET',
		path:'/',
		handler:()=> {
    
			return 'Welcome to API for chohaisanvinhhien.vn';
		}
	},
	{
		method:'GET',
		path:'/api/v1/users',
		config: {
			description: 'Get all the users',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.getUsers
	},
	{
		method:'POST',
		path:'/api/v1/users',
		config: {
			description: 'add a new user',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.addUsers
	},
	{
		method:'PUT',
		path:'/api/v1/users',
		config: {
			description: 'update a user',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.updateUser
	},
	{
		method:'DELETE',
		path:'/api/v1/users',
		config: {
			description: 'delete a user by id',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.deleleUser
	},
	{
		method:'GET',
		path:'/api/v1/users/{id}',
		config: {
			description: 'get detail a user by id',
			tags: ['api', 'v1', 'users'],
		},
		handler: UserController.detailUser
	},
	// route for cate
	{
		method:'GET',
		path:'/api/v1/cates',
		config: {
			description: 'Get all the cate',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.getCates
	},
	{
		method:'POST',
		path:'/api/v1/cates',
		config: {
			description: 'add a new cate',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.addCate
	},
	{
		method:'PUT',
		path:'/api/v1/cates',
		config: {
			description: 'update a cate',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.updateCate
	},
	{
		method:'DELETE',
		path:'/api/v1/cates',
		config: {
			description: 'delete a user by id',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.deleleCate
	},
	{
		method:'GET',
		path:'/api/v1/cates/{id}',
		config: {
			description: 'get detail a user by id',
			tags: ['api', 'v1', 'cates'],
		},
		handler: CateController.detailCate
	},
]);

// Start the server
async function start() {

	try {
		await server.register([
			Inert,
			Vision,
			{
				plugin: HapiSwagger,
				options: {
					info: {
						title: 'Paintings API Documentation',
						version: Pack.version
					}
				}
			}
		]);
		await server.start();
	}
	catch (err) {
		console.log(err);
		// eslint-disable-next-line no-undef
		process.exit(1);
	}

	console.log('Server running at:', server.info.uri);
}

start();