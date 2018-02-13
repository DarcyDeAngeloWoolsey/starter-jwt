const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.get('/api', (req, res) => {
    res.json({
        text: 'my api!'
    });
});

app.post('/api/login', (req, res) => {
    //TODO: auth user
    //add fake user
    const user ={ id: 3 };
    //usually we store a secret key in an envi variable, in a different file
    const token = jwt.sign({ user }, 'my_secret_key');
    //instead of returning the user like normal, just returning the token
    //you can use postman to check the token you recieve
    res.json({
        token: token
    });   
});

app.get('/api/protected', ensureToken, (req, res) => {
    //usually before we verify a token, we make sure there is one there first
    jwt.verify(req.token, 'my_secret_key', function(err, data){
        if (err) {
            res.sendStatus(403);
        }   else {
            res.json({
                text: 'protected',
                data: data
            });
        }
    })
    
});

//usually put this funtion in a seperate file
function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
        
        
app.listen(2020, function() {
    console.log('App listening on port 2020!');
});