const express = 'express';

const router = express.Router();

router.get('/', (req, res) => {
    

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
if(req.param.id){
    res.user({message:"ID received"})
}
else{
    res.status(400).json( {message: "invalid user id"})
}
};

module.exports = router;