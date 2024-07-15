const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const User = require("./user");

// MongoDB Atlas connection string
const uri = 'mongodb+srv://delta010:sky009neon@gymdb.dqrhbsz.mongodb.net/gymdb';

// Configure mongoose to use promises and avoid deprecation warnings
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Middleware
app.set("view engine", "ejs");
app.set("views", "./views");  // Ensure Express knows where to look for views
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        locality: req.body.locality,
        phone: req.body.phone,
        email: req.body.email
    });

    console.log("Submitted user data:", newUser);

    newUser.save()
        .then(() => {
            console.log("User data saved successfully:", newUser);
            res.send("Successfully submitted!");
        })
        .catch(err => {
            console.error("Error saving user data:", err);
            res.status(500).send("There was an error saving your information.");
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
