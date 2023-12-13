const server = require('./src/server.js')
const PORT = 3001
const {conn} = require('./src/db.js')

conn.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });