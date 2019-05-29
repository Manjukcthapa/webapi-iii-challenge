// code away!
const server = require('./server.js');
const router = require('./posts/postRouter.js')

server.use('/', router)

server.listen(4000, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});

