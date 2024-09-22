const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes')
const bodyParser = require('body-parser');

const app = express();


app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api",routes);

mongoose.connect("mongodb://localhost:27017/Blogs", {
    useNewUrlParser: true
}).then( () => {
    console.log("Connected To The Database");
    app.listen(5000,() => {
        console.log("App is listening on Port 5000")
    })
})
