/**
 * Created by rharik on 10/21/14.
 */
'use strict';

var curl = require('curlrequest'),
    uuid = require('node-uuid'),

    is = require('is'),
     esMediaType = 'application/vnd.eventstore.events+json',
     server = 'http://127.0.0.1:2113/streams/',
     username = 'admin',
     password = 'changeit';

module.exports = makeAuthorizedRequest;

function makeAuthorizedRequest(optsOrStream, cb) {
    var opts = is.string(optsOrStream) ? { stream: optsOrStream } : optsOrStream,
        uri = opts.stream.indexOf('http') === 0 ? opts.stream : server + opts.stream,
        options = {
            url: uri,
//            auth: {
//                username: username,
//                password: password
//            },
            headers: {
//                'Accept': esMediaType,
                 'Content-Type': esMediaType
                //, 'ES-LongPoll': 10
            }
        };

    options.method = opts.method;
    console.log('body: '+opts.body);

    if(opts.body + opts.metadata) {
        options.data = JSON.stringify(opts.body);
        console.log('body3: '+options.body);

    }
    curl.request(options, function(err, stdout, meta){
    if(err){
        console.log(err);
    }else{
        console.log('%s %s', meta.cmd, meta.args.join(' '))
    }
});
}

//
//var myData = [
//    {
//        'eventId' : uuid.v1(),
//        'EventType':'SomeEvent',
//        data:{
//            "ProfileDetailsDto": {
//                "ProfileId": "475a8e64-6657-48ad-82bd-04c02c47a695",
//                "Email": "reharik@gmail.com",
//                "Name": "Raif the great",
//                "DisplayName": "Raif the most exalted one"
//            }
//        },
//        "metadata":
//        {
//            "CommitId":uuid.v1(),
//            "CommandClrTypeName":"XO.Local.Conversation.Messages.Command.ContactVendorForBrideCmd, XO.Local.Conversation.Messages, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
//        }
//    }];
//
//console.log(myData);
//
//
//curl.request({url:'http://127.0.0.1:2113/streams/Command',
//    method:'POST',
//    headers:{'Content-Type':'application/vnd.eventstore.events+json'},
//    data:JSON.stringify(myData)
////            , pretend:true
//},function(err, stdout, meta){
//    if(err){
//        console.log(err);
//    }else{
//        console.log('%s %s', meta.cmd, meta.args.join(' '))
//    }
//});