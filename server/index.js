const server = require('./src/server.js')
const PORT = 3001
const {conn} = require('./src/db.js')

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
      console.log('%s listening at ' + PORT); // eslint-disable-line no-console
    });
  });
