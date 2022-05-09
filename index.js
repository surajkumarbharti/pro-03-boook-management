const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route.js")
const mongoose = require("mongoose");
const { timeStamp } = require("console");

// const { Router } = require("express");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Group14:bblpiY3Xmnxx6dQH@cluster0.2huqa.mongodb.net/group14Database?retryWrites=true&w=majority',
{
useNewurlParser: true,
// useUnifiedTopology: true,
})

.then( () => console.log("MongoDb is connected"))

.catch ( err => console.log(err) )

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});