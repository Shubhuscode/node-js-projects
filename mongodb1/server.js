
const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const connectDB = require("./database/db.js");
const User = require("./model/model.js");


const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

// GET route for the home page
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/user", async (req, res) => {
    try {
        // Create a new user document
        const newUser = new User({
            name: req.body.name,
            age: req.body.age
        });

        // Save the user to the database
        await newUser.save();

        res.send("User data saved successfully!");
    } catch (err) {
        console.error("Error saving user data:", err);
        res.status(500).send("Error saving user data");
    }
});



app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is started at port no ${port}`);
    }
});
