/*
	@Author: Abdul Aleem Khan

	-----------------------------------------------------------------------------------------------

	Static server to serve the HTML page of our application
	When server is fired. You can visit url http://localhost:8080

*/

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})