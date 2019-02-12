/* eslint-disable no-console */
const hapi = require('hapi');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const mongosee = require('mongoose');
const config = require('./configs');
const UserController = require('./controllers/UserController');
const CateController = require('./controllers/CateController');
const ProductController = require('./controllers/ProductController');
/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');


const server = hapi.server({
	// eslint-disable-next-line no-undef
	port: process.env.PORT || 3000,
	//host: config.server.host,
	routes: {cors: true}
});

mongosee.connect(`mongodb://${config.db.user}:${config.db.password}@ds227594.mlab.com:27594/chohaisanvinhhien`);

mongosee.connection.once('open', ()=> {
	console.log(' conected to database');
});

const scheme = function () {
	return  {
		authenticate: function (request, h) {

			const req = request.raw.req;
			const authorization = req.headers.authorization;
			if (!authorization) {
				throw Boom.unauthorized(null, 'Custom');
			}

			jwt.verify(authorization, config.server.secrectKey ,{}, (err , result)=>{

				if (err) {
					throw Boom.unauthorized(err.message);
				}

				if (result) {
					return h.authenticated({ credentials: { user: result } });
				}
			});
			
			return h.authenticated({ credentials: { } });
		}
	};
};

server.auth.scheme('auth', scheme);
server.auth.strategy('token', 'auth');

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
			auth: 'token',
			description: 'Get all the users',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.getUsers
	},
	{
		method:'POST',
		path:'/api/v1/users',
		config: {
			auth: 'token',
			description: 'add a new user',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.addUsers
	},
	{
		method:'PUT',
		path:'/api/v1/users',
		config: {
			auth: 'token',
			description: 'update a user',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.updateUser
	},
	{
		method:'DELETE',
		path:'/api/v1/users/{id}',
		config: {
			auth: 'token',
			description: 'delete a user by id',
			tags: ['api', 'v1', 'users']
		},
		handler: UserController.deleleUser
	},
	{
		method:'GET',
		path:'/api/v1/users/{id}',
		config: {
			auth: 'token',
			description: 'get detail a user by id',
			tags: ['api', 'v1', 'users'],
		},
		handler: UserController.detailUser
	},
	{
		method:'POST',
		path:'/api/v1/login',
		config: {
			description: 'login with account and password',
			tags: ['api', 'v1', 'login']
		},
		handler: UserController.loginAccount
	},
	// route for cate
	{
		method:'GET',
		path:'/api/v1/cates',
		config: {
			auth: 'token',
			description: 'Get all the cate',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.getCates
	},
	{
		method:'POST',
		path:'/api/v1/cates',
		config: {
			auth: 'token',
			description: 'add a new cate',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.addCate
	},
	{
		method:'PUT',
		path:'/api/v1/cates',
		config: {
			auth: 'token',
			description: 'update a cate',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.updateCate
	},
	{
		method:'DELETE',
		path:'/api/v1/cates/{id}',
		config: {
			auth: 'token',
			description: 'delete a user by id',
			tags: ['api', 'v1', 'cates']
		},
		handler: CateController.deleleCate
	},
	{
		method:'GET',
		path:'/api/v1/cates/{id}',
		config: {
			auth: 'token',
			description: 'get detail a user by id',
			tags: ['api', 'v1', 'cates'],
		},
		handler: CateController.detailCate
	},
	// route for products
	{
		method:'GET',
		path:'/api/v1/products',
		config: {
			auth: 'token',
			description: 'Get all the products',
			tags: ['api', 'v1', 'products']
		},
		handler: ProductController.getProducts
	},
	{
		method:'POST',
		path:'/api/v1/products',
		config: {
			auth: 'token',
			description: 'add a new product',
			tags: ['api', 'v1', 'products']
		},
		handler: ProductController.addProduct
	},
	{
		method:'PUT',
		path:'/api/v1/products',
		config: {
			auth: 'token',
			description: 'update a product',
			tags: ['api', 'v1', 'products']
		},
		handler: ProductController.updateProduct
	},
	{
		method:'DELETE',
		path:'/api/v1/products/{id}',
		config: {
			auth: 'token',
			description: 'delete a product by id',
			tags: ['api', 'v1', 'products']
		},
		handler: ProductController.deleleProduct
	},
	{
		method:'GET',
		path:'/api/v1/products/{id}',
		config: {
			auth: 'token',
			description: 'get detail a products by id',
			tags: ['api', 'v1', 'products'],
		},
		handler: ProductController.detailProduct
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