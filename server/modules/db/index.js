'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true });

module.exports = mongoose;
