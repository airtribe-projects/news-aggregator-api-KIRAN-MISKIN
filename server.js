const app = require('./app')
const Port  = process.env.PORT;

app.listen(Port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${Port}`); 
});
