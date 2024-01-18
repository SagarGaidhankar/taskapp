const db = require("../models");
const User = db.userinfo;

//create and save a new user
exports.createMyProfile = (req, res) => {
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //create a user
  const user = new User(req.body);
  //save user in db
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the db.",
      });
    });
};

// Retrieve all db from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving db.",
      });
    });
};

// Find a single db with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found db with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving db with id=" + id });
    });
};

// Update a db by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update db with id=${id}. Maybe db was not found!`,
        });
      } else res.send({ message: "db was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating db with id=" + id,
      });
    });
};

// delete a db by the id in the request

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete db with id=${id}. Maybe db was not found!`,
        });
      } else {
        res.send({
          message: "db was deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete db with id=" + id,
      });
    });
};
