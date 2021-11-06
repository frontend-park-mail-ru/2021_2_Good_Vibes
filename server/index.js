'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());


const users = {
    'suleyman': {
        username: 'suleyman',
        email: 'suleyman@mail.ru',
        password: 'password',
    },

    'eugeniy': {
        username: 'eugeniy',
        email: 'eugeniy@mail.ru',
        password: 'password',
    },

    'lidiya': {
        username: 'lidiya',
        email: 'lidiya@mail.ru',
        password: 'password',
    },

    'sergey': {
        username: 'sergey',
        email: 'sergey@mail.ru',
        password: 'password',
    },
}

const ids = {};

app.post('/signup', function (req, res) {
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;

    if (
        !password || !email ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
    ) {
        return res.status(400).json({ error: 'Not valid user data' });
    }
    if (users[username]) {
        return res.status(400).json({ error: 'User already exist' });
    }

    const id = uuidv4();
    const user = { username, password, email };
    ids[id] = username;
    users[username] = user;

    res.cookie('user authorization cookie', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(201).json({ id });
});

app.post('/login', function (req, res) {
    const password = req.body.password;
    const username = req.body.username;
    if (!password || !username) {
        return res.status(400).json({ error: 'Fill all fields' });
    }
    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({ error: 'Wrong username or password' });
    }

    const id = uuidv4();
    ids[id] = username;

    res.cookie('user authorization cookie', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(200).json({ id });
});

app.get('/me', function (req, res) {
    const id = req.cookies['user authorization cookie'];
    const username = ids[id];
    if (!username || !users[username]) {
        return res.status(400).json({ error: 'User are not authorize' });
    }

    res.status(200).json(users[username]);
});

app.post('/logout', function (req, res) {
    const id = req.cookies['user authorization cookie'];
    const username = ids[id];
    if (!username || !users[username]) {
        return res.status(400).json({ error: 'There is no authorized users' });
    }

    ids[id] = undefined;

    res.cookie('user authorization cookie', id, { expires: new Date(Date.now() - 10) });
    res.status(200).json({ id });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});