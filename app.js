// initialize

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require("./routes/api/users");
const flashcards = require("./routes/api/flashcards");
const comments = require("./routes/api/comments");
const decks = require("./routes/api/decks");


const passport = require('passport');

//

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/flashcards", flashcards);
app.use("/api/comments", comments);
app.use("/api/decks", decks);



const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));