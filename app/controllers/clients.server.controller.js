'use strict';

exports.respond = function(_room,socket, io) {
        var mongoose = require('mongoose'),
        errorHandler = require('./errors'),
        ClientSummary = mongoose.model('ClientSummary'),
        Client = mongoose.model('Client'),
        _ = require('lodash'),
        room = _room;

    socket.on('getClients', function (data) {
        console.log('just landed');
        ClientSummary.find().sort('-LastName').exec(function(err, clients) {
            if (err) {
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
            } else {
                socket.emit('getClients',{data:clients});
                console.log('here are clients: '+clients);
            }
        });
    });

    socket.on('createClient', function (data) {
        console.log('arrived at createclient');
        var client = new Client(data);
        console.log(client);
        console.log(data);

        client.save(function(err) {
            if (err) {
                console.log(err);
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
            } else {
//                // Remove sensitive data before login
//                user.password = undefined;
//                user.salt = undefined;

//                req.login(user, function(err) {
//                    if (err) {
//                        res.status(400).send(err);
//                    } else {
//                        res.jsonp(user);
//                    }
//                });
                io.sockets.in(_room).emit('createClient');
                console.log(client);
            }
        });
    });

/**
 * Client authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.client.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
};
