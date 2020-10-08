const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.list = (req, res) => { 
    User.find({},(err, users) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(users);
    });
}

exports.add = (req, res) => {
    let newUser = new User(req.body);
    newUser.senha = bcrypt.hashSync(req.body.password,10);        
    newUser.save((err, user) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(user);
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    let userUpdate = req.body;
    User.findOneAndUpdate({ _id: id }, userUpdate, { new: true }, (err, currentUser) => {
        if(err){
            res.send(err);
        }
        res.json(currentUser);
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;
    User.findOneAndDelete({ _id: id }, (err, currentUser) => {
        if(err){
            res.send(err);
        }
        res.json(currentUser);
    });
}

exports.findUserById = (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err)
            res.status(500).send(err);        
        res.json(user);
    });    
}

exports.searchUser = (req, res, next) => {
    if (req.query && req.query.user){
        const paramUser = req.query.user;

        console.log(paramUser);

        User.findOne({user: paramUser}, (err, user) => {
            if(err) {
                res.status(500).send(err);
            }
            res.json(user);
        });
    }    
}
exports.validateUser = (req, res, next) => {
    if (req.body && req.body.user && req.body.password){
        const user = req.body.user;
        const password = req.body.password;

        User.findOne({user: user}, (err, user) => {
            if(err) {
                res.status(500).send(err);
            }

            const isValide = bcrypt.compareSync(password, user.password);

            if(user && isValide) {
                const token = jwt.sign({
                    id: user.id
                }, 'M@ira01', {expiresIn: "1h"});

                res.status(201).send({"token":token});
            } else {
                res.status(401).send("Usuario ou senha inválidos :(");
            }
        });
    }
}

exports.validateToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        res.status(401).send("Nao tem token de acesso");
    } else {
        jwt.verify(token,'M@ira01',(err, userId) =>{
            if(err) {
                res.status(401).send(err);
            } else {
                console.log("Usuario autorizado: " + userId);
                next();
            }
        })
    }
}
