'use strict';

exports.respond = function(_room,socket, io) {
        var mongoose = require('mongoose'),
        errorHandler = require('./errors'),
        ClientSummary = mongoose.model('ClientSummary'),
        _ = require('lodash'),
        appender = require('../services/ges/ges-appender.js'),
        event = require('../services/ges/eventData.js'),
        uuid = require('node-uuid'),
        room = _room;

    socket.on('getClients', function (data) {
        console.log('just landed');
        ClientSummary.find().sort('-LastName').exec(function(err, clients) {
            if (err) {
                console.log(err);
//                return res.status(400).send({
//                    message: errorHandler.getErrorMessage(err)
//                });
            } else {
                socket.emit('getClients',clients);
            }
        });
    });


























//        console.log(client);
//
//        var myData = [
//            {
//                'eventId' : uuid.v1(),
//                'EventType':'SomeEvent',
//                data:{
//                "ProfileDetailsDto": {
//                    "ProfileId": "475a8e64-6657-48ad-82bd-04c02c47a695",
//                    "Email": "reharik@gmail.com",
//                    "Name": "Raif the great",
//                    "DisplayName": "Raif the most exalted one"
//                }
//            },
//                "metadata":
//            {
//                "CommitId":uuid.v1(),
//                "CommandClrTypeName":"XO.Local.Conversation.Messages.Command.ContactVendorForBrideCmd, XO.Local.Conversation.Messages, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
//            }
//            }];
//
//        console.log(myData);


//        curl.request({url:'http://127.0.0.1:2113/streams/Command',
//            method:'POST',
//            headers:{'Content-Type':'application/vnd.eventstore.events+json'},
//            data:JSON.stringify(myData)
////            , pretend:true
//        },function(err, stdout, meta){
//            if(err){
//                console.log(err);
//            }else{
//                console.log('%s %s', meta.cmd, meta.args.join(' '))
//            }
//        });

//        client.save(function(err) {
//            if (err) {
//                console.log(err);
////                return res.status(400).send({
////                    message: errorHandler.getErrorMessage(err)
////                });
//            } else {
////                // Remove sensitive data before login
////                user.password = undefined;
////                user.salt = undefined;
//
////                req.login(user, function(err) {
////                    if (err) {
////                        res.status(400).send(err);
////                    } else {
////                        res.jsonp(user);
////                    }
////                });
//                socket.emit('createClient');
//                console.log(client);
//            }
//        });
//    });

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
