const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookie = require("cookie-parser");

const userRoute = require('./routes/userRoute');
const homeRoute = require('./routes/homeRoute');
const adminRoute = require('./routes/adminRoute');

app.use(express.static('public'));
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/user', userRoute);
app.use('/', homeRoute);
app.use('/admin', adminRoute);

app.listen(port, () => {
    console.log(`Port is running at ${port}`);
})