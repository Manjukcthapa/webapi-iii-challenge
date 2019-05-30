const express = require("express");
const router = express.Router();
const postDb = require("./postDb");

//GET all posts [/api/posts]
router.get("/api/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

// GET post by id[/api/posts]
router.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .getById(id)
    .then(post => {
      console.log("GET post by id:", post);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

router.delete("/api/posts/:id", (req, res) => {
    const postid = req.params.id;
    postDb.remove(postid)
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
    

router.put("/api/posts/:id", (req, res) => {
    postDb.insert({
        text: req.body.text, 
        id: req.body.user_Id})
     .then(newpost => {
       res.status(201).json(newpost);
     })
     .catch(error => {
       res.status(500).json({ message: error });
     })

});

// custom middleware

function validatePostId(req, res, next) {
  if (req.param.id) {
    res.user({ message: "ID received" });
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
  next()
}

module.exports = router;
