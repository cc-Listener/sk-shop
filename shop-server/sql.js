var mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'sk-shop',
	port: 3306
});

module.exports = connection;