// code away!
const server = require('./server.js');
// const postRouter = require('./posts/postRouter.js');
// const userRouter = require('./users/userRouter.js');

// server.use('/', postRouter)
// server.use('/api/user', userRouter)

server.listen(4000, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});

