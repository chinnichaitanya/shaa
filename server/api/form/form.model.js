'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
	form_id: String,
	form_name: String,
	form_role: {
		type: String,
		default: 'All'
	},
	created_on: {
		type: Date,
		default: Date.now()
	},
	updated_on: {
		type: Date,
		default: Date.now()
	},
	form_category: [],
	form_fields: [],
	form_responses: []
});

module.exports = mongoose.model('Form', FormSchema);