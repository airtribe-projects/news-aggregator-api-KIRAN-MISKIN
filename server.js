const app = require('./app')
const Port  = process.env.Port;

app.listen(Port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${Port}`); 
});
