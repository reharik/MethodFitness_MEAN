'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * State Schema
 */
var StateSchema = new Schema({
    Name: {
		type: String,
		default: '',
		trim: true
	},
    Code: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('State', StateSchema);
