/**
 * Created by rharik on 10/21/14.
 */

'use strict';

var makeRequest = require('./makeRequest');

module.exports = addEventToStream;

function addEventToStream(stream, events, cb) {
    makeRequest({ method: 'post', stream: stream, body: events },
        function(err, res, body) {
        if(err) return cb(err);

        console.log('headers: '+res.headers, body);
        if(body) {
            body = JSON.parse(body);
        }
        cb(null, body);
    });
}