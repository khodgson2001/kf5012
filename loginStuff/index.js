const express = require('express'); //import express
const app = express();
const port = 1234;

app.get('/', (req, res) =>{
    res.send("testinggggg");

})

app.get('/dashboard', (req, res)=> {
    res.send(`
    <h1> Test Page 123 </h1>
    <p> This is a test page that is showing some random stuff </p>    
    `);
})

app.get('/jsontest', (req, res)=>{
    res.json({
        "name": "Kieran",
        "age": 20,
        "course": "Web Dev"
    })

})

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
});