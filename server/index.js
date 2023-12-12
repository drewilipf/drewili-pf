const server = require('./src/server.js')
const PORT = 3001
server.listen(PORT, ()=>{
    console.log(`listening at ${PORT}`);
})