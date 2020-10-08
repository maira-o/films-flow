const Film = require('../models/film');

exports.list = (req, res) => { 
    Film.find({},(err, films) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(films);
    });
}

exports.add = (req, res) => {

    let newFilm = new Film(req.body);   

    newFilm.save((err, film) => {
        if(err){
            res.send('erro ao tentar salvar um filme' + err);
        }    
        res.status(201).json({ message: 'Uhuul, você adicionou mais um filme em Film & Flow!' });
        
    });
}

exports.update = (req, res) => {
    let id = req.params.id;

    let filmUpdate = req.body;
    Film.findOneAndUpdate({ _id: id }, filmUpdate, { new: true }, (err, currentFilm) => {
        if(err){
            res.send('erro ao atualizar o film :( ' + err);
        }
        res.json({ message: 'Uhuul, film atualizado com sucesso! :)' }, currentFilm);
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;

    Film.findOneAndDelete({ _id: id }, (err, currentFilm) => {
        if(err){
            res.send('erro ao deletar o film :( ' + err);
        }
        res.json({ message: 'Film deletado.' }, currentFilm);
    });
}

exports.findFilmById = (req, res) => {
    let id = req.params.id;
    Film.findById(id, (err, film) => {
        if(err)
            res.status(500).send('id do film não encontrado :( ' + err);        
        res.json(film);
    });    
}

exports.searchFilm = (req, res, next) => {
    if (req.query && req.query.name){
        const paramName = req.query.name;

        Film.find({name: paramName}, (err, films) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(films);
        });
    }
}