
'use strict';




module.exports = function() {
    return function(){
        var mongoose = require('mongoose'),
    State = mongoose.model('State'),
    _ = require('lodash');



        console.log('state'+State);
    var states;
        State.find().exec(function(err,count){states=count;console.log('statesxxx'+count);});
    console.log('states'+states);
    var hasStates = _.some(states, Boolean);
    console.log(hasStates);
    if(hasStates){return;}
    var s = new State({Code: 'AL', Name: 'Alabama'});
    State.save();
    s = new State({Code: 'AK', Name: 'Alaska'});
    State.save();
    s = new State({Code: 'AZ', Name: 'Arizona'});
    State.save();
    s = new State({Code: 'AR', Name: 'Arkansas'});
    State.save();
    s = new State({Code: 'CA', Name: 'California'});
    State.save();
    s = new State({Code: 'CO', Name: 'Colorado'});
    State.save();
    s = new State({Code: 'CT', Name: 'Connecticut'});
    State.save();
    s = new State({Code: 'DE', Name: 'Delaware'});
    State.save();
    s = new State({Code: 'DC', Name: 'District Of Columbia'});
    State.save();
    s = new State({Code: 'FL', Name: 'Florida'});
    State.save();
    s = new State({Code: 'GA', Name: 'Georgia'});
    State.save();
    s = new State({Code: 'HI', Name: 'Hawaii'});
    State.save();
    s = new State({Code: 'ID', Name: 'Idaho'});
    State.save();
    s = new State({Code: 'IL', Name: 'Illinois'});
    State.save();
    s = new State({Code: 'IN', Name: 'Indiana'});
    State.save();
    s = new State({Code: 'IA', Name: 'Iowa'});
    State.save();
    s = new State({Code: 'KS', Name: 'Kansas'});
    State.save();
    s = new State({Code: 'KY', Name: 'Kentucky'});
    State.save();
    s = new State({Code: 'LA', Name: 'Louisiana'});
    State.save();
    s = new State({Code: 'ME', Name: 'Maine'});
    State.save();
    s = new State({Code: 'MD', Name: 'Maryland'});
    State.save();
    s = new State({Code: 'MA', Name: 'Massachusetts'});
    State.save();
    s = new State({Code: 'MI', Name: 'Michigan'});
    State.save();
    s = new State({Code: 'MN', Name: 'Minnesota'});
    State.save();
    s = new State({Code: 'MS', Name: 'Mississippi'});
    State.save();
    State.save();
    s = new State({Code: 'MO', Name: 'Missouri'});
    State.save();
    s = new State({Code: 'MT', Name: 'Montana'});
    State.save();
    s = new State({Code: 'NE', Name: 'Nebraska'});
    State.save();
    s = new State({Code: 'NV', Name: 'Nevada'});
    State.save();
    s = new State({Code: 'NH', Name: 'New Hampshire'});
    State.save();
    s = new State({Code: 'NJ', Name: 'New Jersey'});
    State.save();
    s = new State({Code: 'NM', Name: 'New Mexico'});
    State.save();
    s = new State({Code: 'NY', Name: 'New York'});
    State.save();
    s = new State({Code: 'NC', Name: 'North Carolina'});
    State.save();
    s = new State({Code: 'ND', Name: 'North Dakota'});
    State.save();
    s = new State({Code: 'OH', Name: 'Ohio'});
    State.save();
    s = new State({Code: 'OK', Name: 'Oklahoma'});
    State.save();
    s = new State({Code: 'OR', Name: 'Oregon'});
    State.save();
    s = new State({Code: 'PA', Name: 'Pennsylvania'});
    State.save();
    s = new State({Code: 'RI', Name: 'Rhode Island'});
    State.save();
    s = new State({Code: 'SC', Name: 'South Carolina'});
    State.save();
    s = new State({Code: 'SD', Name: 'South Dakota'});
    State.save();
    s = new State({Code: 'TN', Name: 'Tennessee'});
    State.save();
    s = new State({Code: 'TX', Name: 'Texas'});
    State.save();
    s = new State({Code: 'UT', Name: 'Utah'});
    State.save();
    s = new State({Code: 'VT', Name: 'Vermont'});
    State.save();
    s = new State({Code: 'VA', Name: 'Virginia'});
    State.save();
    s = new State({Code: 'WA', Name: 'Washington'});
    State.save();
    s = new State({Code: 'WV', Name: 'West Virginia'});
    State.save();
    s = new State({Code: 'WI', Name: 'Wisconsin'});
    State.save();
    s = new State({Code: 'WY', Name: 'Wyoming'});
    State.save();
};
};