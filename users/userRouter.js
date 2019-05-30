const express = require("express");
const router = express.Router();
const db = require("./userDb")
const postDb = require("../posts/postDb")

router.post("/", validateUser,(req, res) => {
    console.log('I am in post')
    const user = req.body;
    db.insert(user)
    .then(user => {
    res.status(201).json(user);
    })
    .catch(err => {
    res.status(500).json({
    error: "There was an error while saving the user to the database"
    });
  }); 
});

router.get("/", (req, res) => {
    db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

router.get("/:id",validateUser, (req, res) => {
    const userid = req.params.id;
    const { id } = req.params;

  db.getById(id)
    .then(user => {
      console.log("GET post by id:", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "post Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
    
  
   
});

router.get(":id/posts", (req, res) => {});

router.delete("/:id",validateUser, (req, res) => {
   
  
const userid = req.params.id;
postDb.remove(userid)
.then(number =>{
    if(number){
        res.status(201).json({number});
    } else {
        res.status(404).json({
            message:"The user with specified ID does no exist"
        })
    }
})
.catch(error => {
    res.status(500).json({ message: "The user could not be removed" , error});
})
});

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
    console.log('I am validating user', req.body)

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
