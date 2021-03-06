"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var baseURL = 'http://localhost:8080/api/users';
var UserService = /** @class */ (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
    }
    UserService.prototype.addUser = function (newUser) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(newUser);
        return this.http.post(baseURL, body, { headers: headers });
    };
    UserService.prototype.getUsers = function () {
        return this.http.get(baseURL);
    };
    UserService.prototype.getUser = function (username) {
        return this.http.get(baseURL + ("/" + username));
    };
    UserService.prototype.canActivate = function (id) {
        var _this = this;
        this.getUser(id).subscribe(function (data) {
            _this.router.navigate(['user/' + data._id]);
        });
        return rxjs_1.of(false);
    };
    UserService.prototype.getUserByEmail = function (email) {
        return this.http.get(baseURL + ("/" + email + "/1"));
    };
    UserService.prototype.editUser = function (username, editedUser) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(editedUser);
        return this.http.patch(baseURL + ("/" + username), body, { headers: headers });
    };
    UserService.prototype.addFriend = function (id, friendName) {
        this.user = JSON.parse(localStorage.getItem('user'));
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify({ friends: friendName });
        return this.http.put(baseURL + ("/" + id), body, { headers: headers });
    };
    UserService.prototype.deleteUser = function (user) {
        return this.http["delete"](baseURL + ("/" + user._id));
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
