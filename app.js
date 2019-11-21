const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

function getConnection(){return mysql.createConnection({host: 'localhost', user: 'root', database: 'user_data'});}

// User stuff
app.use(morgan('combined'));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));

// Initial Route
app.get("/", (req, res) => {
	console.log("Responding to root route");
	res.send("Hello from root.");
});

// Router for user data
const router = require('./routes/user.js');
app.use(router);

// Listen on specified port
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
