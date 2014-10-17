'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.route('/').get(core.index);

//
//    socket.on('getClients', function (data) {
//        console.log("whatthefuck");
//        socket.emit('getClients',{
//            data: [
//                {
//                    "firstName": "Cox",
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
//                }]
//        });
//    });
};