"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema((_ref = {
  titleEn: {
    required: true,
    type: String
  },
  titleBg: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: String
  },
  genre: {
    required: true,
    type: String
  },
  producer: {
    required: true,
    type: String
  }
}, _defineProperty(_ref, "genre", {
  required: true,
  type: Number
}), _defineProperty(_ref, "watches", {
  required: true,
  type: Number
}), _defineProperty(_ref, "country", {
  required: true,
  type: String
}), _ref));
module.exports = mongoose.model('Movie', movieSchema, "Movies");