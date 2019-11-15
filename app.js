const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');

app.use(morgan('combined'));

app.get("/", (req, res) => {
	console.log("Responding to root route");
	res.send("Hello from root.");
});

app.get("/users", (req, res) => {
	var user_one = {firstName: "Dyllon", lastName: "London"};
	res.json([user_one]);
});


app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
