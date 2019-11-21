// Contain all of user related routes
const express = require('express');
const router = express.Router();
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'user_data'
});

function getConnection(){return pool;}
function getTotalUsers(){
	var data = getConnection().query("SELECT COUNT(*) AS totalusers FROM users", (err, results, field) => {
		return results[0].totalusers;
	});
}

// Router Endpoint
router.get('/messages', (req, res) => {
	console.log("Messages Router");
	res.end();
});

// Query data from specific user
router.get("/user/:id", (req, res) => {
	console.log("Fetched ID: " + req.params.id);
	
	const connection = getConnection();
	const queryString = "SELECT * FROM users WHERE id = ?";
	const userId = req.params.id;

	connection.query(queryString, [userId], (err, rows, fields) => {
		if(err){
			console.log("Failed to query for users: " + err);
			res.sendStatus(500);
			res.end();
			return; // also throw err
		}

		console.log("MYSQL Query Successful");

		// Custon formatting for json responses
		const users = rows.map((row) => {
			return {id: row.id, firstName: row.firstname, lastName: row.lastname};
		});
		res.json(users);
		//res.json(rows);
	});
	//res.end();
});

router.post("/user_create", (req, res) => {
	console.log("Creating new user");

	const firstName = req.body.create_first_name;
	const lastName = req.body.create_last_name;

	const queryString = "INSERT INTO users (firstname, lastname) VALUES (?, ?)";
	getConnection().query(queryString, [firstName, lastName], (err, results, field) => {
		if(err){	
			console.log("Failed to insert new user: " + err);
			res.sendStatus(500);
			return;
		}
		console.log("Inserted a new user with ID: ", results.insertId);
		res.end();
	});
	res.end();
});

// Query all users
router.get("/users", (req, res) => {
	const connection = getConnection();
	const queryString = "SELECT * FROM users";

	connection.query(queryString, (err, rows, fields) => {
		if(err){
			console.log("Failed to query for users: " + err);
			res.sendStatus(500);
			return;
		}
		res.json(rows);
	});
});

// Export router outside of file
module.exports = router;