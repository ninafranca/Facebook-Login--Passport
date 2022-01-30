import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import initializePassportConfig from './passport-config.js';

const PORT = 8080;
const app = express();
const server = app.listen(8080, () => console.log(`Listening on ${PORT}`));
const connection  = mongoose.connect('mongodb+srv://Nina:123@ecommerce.b23tg.mongodb.net/usuarios?retryWrites=true&w=majority');

app.use(cors());
app.use(session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://Nina:123@ecommerce.b23tg.mongodb.net/sessions?retryWrites=true&w=majority'}),
    secret:"coderFacebook",
    resave:false,
    saveUninitialized:false
}));
app.use(express.static('public'));
app.use(express.json());
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/facebook', passport.authenticate('facebook',{scope:['emails', 'photos', 'displayName']}), (req,res) => {
})

app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login-fail'}), (req, res) => {
        res.sendFile("fb-login.html", {root: "./public/pages"});
    }
);

app.get('/paginadeFail', (req,res) => {
    res.send("Login error")
})

app.get('/logout', (req,res) => {
    req.logout();
})