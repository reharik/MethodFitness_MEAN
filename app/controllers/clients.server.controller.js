'use strict';

exports.respond = function(_room,socket, io) {
        var mongoose = require('mongoose'),
        errorHandler = require('./errors'),
        Client = mongoose.model('Client'),
        State = mongoose.model('State'),
        _ = require('lodash'),
        appender = require('../services/ges/ges-appender.js'),
        event = require('../services/ges/eventData.js'),
        uuid = require('node-uuid'),
        async = require('async'),
        room = _room;

    socket.on('getCreateClientViewModel', function (data) {
        console.log('getCreateClientViewModel');
        var viewModel = {};
        async.parallel({
            states: function(cb){
                State.find({}, cb);
            }
        }, function(err, results){
            if(err){
                console.log(err);
            }else{viewModel.states = results.states;
               socket.emit('createClientViewModel',{viewModel:viewModel});
            }
        });
//        console.log('calling states');

//            console.log("results: "+states);
//        State.find(function(err,states){
//            if(err){
//                console.log(err);
//            }else{
//                viewModel.states = states;
////            console.log("veiwmodel: "+viewModel.states);
//            socket.emit('createClientViewModel',{viewModel:viewModel});
//            }
//        })
    });

    socket.on('createClient', function (data) {
        console.log('arrived at createclient');

        Client.findOne({ 'EmailAddress': data.EmailAddress }).exec(function (err, client) {
            if (err) {return handleError(err);}
            else if(client){ console.log(client); }
        });

        var metadata = {
            'CommitId':uuid.v1(),
            'ClientRoom':_room,
            'ReturnEvent':'clientCreatedResponse'
        };
        var _event = {
            Contact: {  FirstName: data.FirstName,
                LastName: data.LastName,
                EmailAddress: data.EmailAddress,
                PhoneMobile: data.PhoneMobile,
                PhoneSecondary: data.PhoneSecondary
            },
            TrainerId: data.TrainerId,
            SourceNotes: data.SourceNotes,
            StartDate: data.StartDate
        };
        if (data.Source == "TrainerGenerated")
        {
            metadata.CommandTypeName='SignUpTrainerGeneratedClient';
        }
        else
        {
            metadata.CommandTypeName='SignUpHouseGeneratedClient';
            event.Source= data.Source;
        }
        appender('CommandDispatch', new event(uuid.v1(), metadata.CommandTypeName, true, _event, metadata),function(){});
        socket.emit('clientCreatedCmdSent');
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
