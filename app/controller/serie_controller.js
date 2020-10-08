const Serie = require('../models/serie');

exports.list = (req, res) => { 
    Serie.find({},(err, series) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(series);
    });
}

exports.add = (req, res) => {

    let newSerie = new Serie(req.body);   

    newSerie.save((err, serie) => {
        if(err){
            res.send('erro ao tentar salvar uma série' + err);
        }    
        res.status(201).json({ message: 'Uhuul, você adicionou mais uma Séria em Film & Flow!' });
        
    });
}

exports.update = (req, res) => {
    let id = req.params.id;

    let serieUpdate = req.body;
    Serie.findOneAndUpdate({ _id: id }, serieUpdate, { new: true }, (err, currentSerie) => {
        if(err){
            res.send('erro ao atualizar a Série :( ' + err);
        }
        res.json({ message: 'Uhuul, Série atualizada com sucesso! :)' }, currentSerie);
    });
}

exports.delete = (req, res) => {
    let id = req.params.id;

    Serie.findOneAndDelete({ _id: id }, (err, currentSerie) => {
        if(err){
            res.send('erro ao deletar a Série :( ' + err);
        }
        res.json({ message: 'Série deletada.' }, currentSerie);
    });
}

exports.findSerieById = (req, res) => {
    let id = req.params.id;
    Serie.findById(id, (err, serie) => {
        if(err)
            res.status(500).send('id da Serie não encontrado :( ' + err);        
        res.json(serie);
    });    
}

exports.searchSerie = (req, res, next) => {
    if (req.query && req.query.name){
        const paramName = req.query.name;

        Serie.find({name: paramName}, (err, series) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(series);
        });
    }
}