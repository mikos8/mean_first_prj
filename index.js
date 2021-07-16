const express = require('express');
const cors = require('cors'); //для работы со сторонними api пример вход через гугл
const bodyParser = require('body-parser')// 
const mongoose = require('mongoose') // mongodb
const passport = require('passport');
const path = require('path');
const account = require('./routes/account')

const config = require('./config/db')
const app = express();
const port = 3030;
    //прописываем полный путь относительно этого файла и указываем наименование
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(bodyParser.json());
//улавливаем события при подключении 
mongoose.connect(config.db);
mongoose.connection.on('connected',()=>{
    console.log('conected BD')
})
mongoose.connection.on('error',(err)=>{
    console.log('error not connected',err)
})

app.get('/',(req,res)=>{res.send('Home page website');});
// app.use('/account',account )
app.get('/account/reg', (req, res) => {
    res.send('Page Registration');
});
app.get('/account/auth', (req, res) => {
    res.send('Page Authorization');
});
app.get('/account/dashboard', (req, res) => {
    res.send('User Page');
});


app.listen(port,()=>{
    console.log('server running',port)
})
