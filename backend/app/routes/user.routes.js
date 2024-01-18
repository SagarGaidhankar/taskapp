module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  //create new
  router.post("/myprofile", user.createMyProfile);

  // Retrieve all Tutorials
  router.get("/", user.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", user.findOne);

  // Update a Tutorial with id
  router.put("/:id", user.update);

  // delete a Tutorial with id
  router.delete("/:id", user.delete);

  app.use("/api/dbnames", router);
};
