const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    db.getById(id).then(user => {
      console.log(user);
      if (!user) {
        res.status(400).json({ message: "invalid user id" })
      } else {
        req.user = user;
        next();
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ message: "user could not be retrieved" })
    })
}

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing user data" })
      } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
      } else {
        next();
      }
}

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing post data" })
      } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" })
      } else if (!req.body.user_id) {
        res.status(400).json({ message: "missing required user id field" })
      } else {
        next();
      }
}

module.exports = router;
