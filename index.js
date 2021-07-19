const express = require('express');
const cors = require('cors'); //для работы со сторонними api пример вход через гугл
const bodyParser = require('body-parser') // 
const mongoose = require('mongoose') // mongodb
const passport = require('passport');
const path = require('path');
const account = require('./routes/account');
const jwt = require('jsonwebtoken');

const config = require('./config/db')
const User = require('./models/user')

const app = express();
const port = 3030;

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport);
//прописываем полный путь относительно этого файла и указываем наименование
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());

//улавливаем события при подключении 
mongoose.connect(config.db);
mongoose.connection.on('connected', () => {
    console.log('conected BD')
})
mongoose.connection.on('error', (err) => {
    console.log('error not connected', err)
})

app.get('/', (req, res) => {
    res.send('Home page website');
});

// app.use('/account',account )---------------------------------------

app.post('/account/reg', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: "User not added to bd"
            })
        } else {
            res.json({
                success: true,
                msg: "User ADD to bd"
            })
        }
    });
    res.send('Page Registration');
});

app.post('/account/auth', (req, res) => {
    res.send('Page Authorization');

    const login = req.body.login;
    const password = req.body.password;
    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            success: false,
            msg: "User not find"
        })
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user,config.secret,{
                    expireIn:3600 * 24
                });
                res.json({
                    succes:true,
                    token:"JWT"+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        login:user.login,
                        email:user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg: "User not find"
                })
            }
        });
    })

});
app.get('/account/dashboard', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.send('User Page');
});
/**----------------------------------------------------------------- */

app.listen(port, () => {
    console.log('server running', port)
})