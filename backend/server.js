const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000", //url of the project in " " in double quort
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route for testing in postman or on local host
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mini Project application." });
});

require("./app/routes/user.routes")(app);
//require("./app/routes/filename.routes")(app);

//set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
