'use strict';

exports.respond = function(_room,socket, io) {
        var mongoose = require('mongoose'),
        errorHandler = require('./errors'),
        ClientSummary = mongoose.model('ClientSummary'),
        _ = require('lodash'),
        room = _room;

    socket.on('getClients', function (data) {
        ClientSummary.find().sort('-LastName').exec(function(err, clients) {
            if (err) {
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
            } else {
                io.sockets.in(_room).emit('getClients',{data:clients});
                console.log(clients);
            }
        });

    socket.on('createClient', function (data) {
        ClientSummary.find().sort('-LastName').exec(function(err, clients) {
            if (err) {
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
            } else {
                io.sockets.in(_room).emit('getClients',{data:clients});
                console.log(clients);
            }
        });




//
//
//        var d;
//        if(room == 'reharik@gmail.com'){
//            d=[
//                {
//                    "firstName": "jesus",
//                    "lastName": "Carney",
//                    "company": "Enormo",
//                    "employed": true
//                },
//                {
//                    "firstName": "Lorraine",
//                    "lastName": "Wise",
//                    "company": "Comveyer",
//                    "employed": false
//                },
//                {
//                    "firstName": "Nancy",
//                    "lastName": "Waters",
//                    "company": "Fuelton",
//                    "employed": false
//                }];
//        }else{
//            d = [
//                {
//                    "firstName": "fuck",
//                    "lastName": "nutz",
//                    "company": "Enormo",
//                    "employed": true
//                }];
//        }
//        io.sockets.in(room).emit('getClients',{data:d});
    });
};

/**
 * Client authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.client.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};