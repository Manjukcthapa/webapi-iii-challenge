const express = require('express');
const helmet = require('helmet');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');


const server = express();
server.use(express.json())
server.use(logger);
server.use(helmet());
server.use('/', postRouter)
server.use('/api/users', userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}' at ${new Date()}`);
  next();
}




module.exports = server;
