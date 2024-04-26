//Dependencies
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

var app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');
const port = process.env.PORT || 4444;

//Configure Body Pareser and Cookie Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(publicPath);

app.get('/', (req, res) => {
    res.sendFile(indexPath);
})

app.listen(port, function(){
  console.log(`Listening at http://localhost:${port}`);
});
