// code away!
const server = require('./server.js');

require('dotenv').config();
// const postRouter = require('./posts/postRouter.js');
// const userRouter = require('./users/userRouter.js');
const port = process.env.PORT || 3000;
// server.use('/', postRouter)
// server.use('/api/user', userRouter)

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port}*\n`);
});





