"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentService = void 0;
var core_1 = require("@angular/core");
var baseURL = 'http://localhost:8080/api/comments';
var CommentService = /** @class */ (function () {
    function CommentService(http) {
        this.http = http;
    }
    CommentService.prototype.getAll = function () {
        return this.http.get(baseURL);
    };
    CommentService.prototype.getCommentById = function (id) {
        return this.http.get(baseURL + ("/" + id));
    };
    CommentService.prototype.addComment = function (comment) {
        console.log(comment);
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(comment);
        return this.http.post(baseURL, body, { headers: headers });
    };
    CommentService.prototype.removeComment = function (id) {
        return this.http["delete"](baseURL + ("/" + id));
    };
    CommentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
