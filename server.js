// modules
var express = require('express');
var request = require('request');
var app = express();
var fs = require('fs'),
    obj

// set the static files location
app.use(express.static(__dirname + "/public"));

app.get('/hotels', function (req, res) {
    fs.readFile(__dirname + '/hotels.json', handleFile);

    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
        // You can now play with your datas
        console.log(JSON.stringify(obj));
        res.json(obj);
    }


});

app.listen(process.env.PORT || 8082);
console.log('Movie App on port 8082');