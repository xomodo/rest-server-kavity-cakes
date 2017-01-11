var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');
// dish router is used to process cakes.
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
console.log('enter dishrouter musto');
dishRouter.route('/')
.get(function (req, res, next) {
    Dishes.find(req.query)
	console.log(dish)
	console.log('musto2 dishrouter')
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) next(err);
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
        if (err) next(err);
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) next(err);
        res.json(dish);
    });
})

.put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) next(err);
        res.json(dish);
    });
})

.delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});
module.exports = dishRouter;