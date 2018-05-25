var mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'sk-shop',
	port: 3306
});

module.exports = connection;