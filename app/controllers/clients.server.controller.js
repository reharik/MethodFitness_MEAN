'use strict';

exports.respond = function(room,socket, io) {
    var mongoose = require('mongoose'),
        errorHandler = require('./errors'),
        Client = mongoose.model('Client'),
        _ = require('lodash');

    socket.on('getClients', function (data) {
        var d;
        if(room == 'reharik@gmail.com'){
            d=[
                {
                    "firstName": "jesus",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true
                },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                }];
        }else{
            d = [
                {
                    "firstName": "fuck",
                    "lastName": "nutz",
                    "company": "Enormo",
                    "employed": true
                }];
        }
        io.sockets.in(room).emit('getClients',{data:d});
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