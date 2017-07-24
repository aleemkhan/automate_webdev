/*
	@Author: Abdul Aleem Khan

	-----------------------------------------------------------------------------------------------

	Static server to serve the HTML page of our application
	When server is fired. You can visit url http://localhost:8080

*/

var connect = require('connect');

var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(8080, function(){

    console.log('Server running on 8080...');

});