'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
    FirstName: {
		type: String,
		default: '',
		required: 'Please fill Client first name',
		trim: true
	},
    LastName: {
        type: String,
        default: '',
        required: 'Please fill Client last name',
        trim: true
    },
    EmailAddress: {
        type: String,
        default: '',
        required: 'Please fill Client email address',
        trim: true
    },
    Address1: {
        type: String,
        default: '',
        trim: true
    },
    Address2: {
        type: String,
        default: '',
        trim: true
    },
    City: {
        type: String,
        default: '',
        trim: true
    },
    State: {
        type: String,
        default: '',
        trim: true
    },
    Zip: {
        type: String,
        default: '',
        trim: true
    },
    Phone: {
        type: String,
        default: '',
        trim: true
    },
    Source: {
        type: String,
        default: '',
        trim: true
    },
    SourceNotes: {
        type: String,
        default: '',
        trim: true
    },
    Archived: {
        type: Boolean,
        default: false
    },
    ArchiveDate: {
        type: Date,
        default: Date.now
    },
	StartDate: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Client', ClientSchema);
