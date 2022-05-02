"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user.model.js");

router.param('email', function (req, res, next, email) {
  var modified = email;
  req.email = modified;
  next();
});
router.param('username', function (req, res, next, username) {
  var modified = username;
  req.username = modified;
  next();
});

var userExists = function userExists(email) {
  var user;
  return regeneratorRuntime.async(function userExists$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email.toLowerCase().trim()
          }));

        case 2:
          user = _context.sent;

          if (!user) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", true);

        case 5:
          return _context.abrupt("return", false);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

router.get('/Users', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context2.sent;
          res.send({
            data: users
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/Users', function _callee2(req, res) {
  var user, newUser;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = new User({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            birthdate: req.body.birthday,
            username: req.body.username,
            password: req.body.password,
            role: 'user'
          });
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(userExists(req.body.email));

        case 4:
          if (!_context3.sent) {
            _context3.next = 8;
            break;
          }

          res.status(409).json({
            error: 'Email already exists'
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          newUser = _context3.sent;
          res.status(201).json(newUser);

        case 12:
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.get('/Users/:username', function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: req.params.username
          }));

        case 3:
          user = _context4.sent;
          res.send(user);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;