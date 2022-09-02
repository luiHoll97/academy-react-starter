const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const port = process.env.PORT || 3001;

//midleware
app.use(cors());
app.use(express.json());

// routes

// Test 2/9/22 (render)

app.get("/hello", async (req, res) => {
	console.log("Here's the time, Lui")
	res.send("hello Lui" + new Date())
})

// create a todo

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body; // this takes JSON data to use
		const newTodo = await pool.query
			(
				"insert into todo (description) values ($1) returning *", [description]
			)
		// returning * always do this when updating or deleting to return back the data
		res.json(newTodo.rows); // * newTodo.rows[0] will return item added
		console.log("Lui added a new task")
	}
	catch (err) {
		console.log(err)
		res.status(500).send("sorry bud, error on server")
		console.log("didnt work mate");
	}
}
)

// get all todos

app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query(
			"select * from todo"
		)
		res.json(allTodos.rows)
		console.log("here are all the todos Lui")
	}
	catch (err) {
		console.error(err)
	}
})
// get a todos

app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const specificTodos = await pool.query(
			"select * from todo where todo_id = ($1)", [id]
		)
		res.json(specificTodos.rows[0])
	}
	catch (err) {
		console.error(err)
	}
})

// update a todo

app.post("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool.query(
			"update todo set description = $1 where todo_id = $2", [description, id]
		)
		res.json("todo updated Lui, good job")
	}
	catch (err) {
		console.error(err)
	}
});

// delete todo

app.post("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query(
			"delete from todo where todo_id = $1", [id]
		)
		res.json("todo deleted Lui")
	}
	catch (err) {
		console.error(err)
	}
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));