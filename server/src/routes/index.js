import authMiddleware from '../middlewares/authMiddleware.js';

import createMusic from '../actions/music/create.js'
import { getMusic, getAllMusics } from '../actions/music/get.js'
import updateMusic from '../actions/music/update.js'
import deleteMusic from '../actions/music/delete.js'

import createUser from '../actions/user/create.js'
import { getUser, getAllUsers } from '../actions/user/get.js'
import updateUser from '../actions/user/update.js'
import deleteUser from '../actions/user/delete.js'

import login from '../actions/user/login.js'
import signup from '../actions/user/signup.js'

import createLineUp from '../actions/lineup/create.js'
import { getLineUp, getAllLineUps } from '../actions/lineup/get.js'
import updateLineUp from '../actions/lineup/update.js'
import deleteLineUp from '../actions/lineup/delete.js'

export default function routes(app) {
    // Music routes
    app.post("/music", createMusic)
    app.get("/music", getMusic)
    app.put("/music/:id", updateMusic)
    app.delete("/music", deleteMusic)

    // User routes
    app.post('/user', createUser);
    app.get('/user', getAllUsers);
    app.get('/user/:id', getUser);
    app.put('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);

    // LineUp routes
    app.post('/lineup', createLineUp);
    app.get('/lineup', getAllLineUps);
    app.get('/lineup/:id', getLineUp);
    app.put('/lineup/:id', updateLineUp);
    app.delete('/lineup/:id', deleteLineUp);

    app.post('/auth/login', login)
    app.post('/auth/signup', signup)
    app.get('/auth/me', authMiddleware, async (req, res) => {
        res.json(req.user)
    });
}