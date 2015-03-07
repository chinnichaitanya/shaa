'use strict';

var express = require('express');
var controller = require('./form.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), auth.hasRole('admin'), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.showById);
router.get('/dashFormFields/:category', auth.isAuthenticated(), controller.showByCategory);
router.get('/dashFormValues/:category', auth.isAuthenticated(), controller.showValues);
router.get('/adminFormValues/:category', auth.isAuthenticated(), controller.showValuesAll);

router.post('/', auth.isAuthenticated(), auth.hasRole('admin'), controller.create);
router.post('/submitForm', auth.isAuthenticated(), controller.submitForm);
router.post('/delete', auth.isAuthenticated(), controller.destroy);

router.delete('/:id', auth.isAuthenticated(), auth.hasRole('admin'), controller.destroy);

module.exports = router;