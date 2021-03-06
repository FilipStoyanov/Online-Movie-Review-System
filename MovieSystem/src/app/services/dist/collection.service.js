"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionService = void 0;
var core_1 = require("@angular/core");
var baseURL = 'http://localhost:8080/api/collections';
var CollectionService = /** @class */ (function () {
    function CollectionService(http) {
        this.http = http;
    }
    CollectionService.prototype.getAll = function () {
        return this.http.get(baseURL);
    };
    CollectionService.prototype.getAllForUser = function (userId) {
        return this.http.get(baseURL + ("/" + userId));
    };
    CollectionService.prototype.addCollection = function (collection) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(collection);
        return this.http.post(baseURL, body, { headers: headers });
    };
    CollectionService.prototype.reorderCollection = function (collection) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(collection);
        return this.http.patch(baseURL + ("/" + collection._id), body, { headers: headers });
    };
    CollectionService.prototype.removeCollection = function (id) {
        return this.http["delete"](baseURL + ("/" + id));
    };
    CollectionService.prototype.updateCollection = function (id, titleen, titlebg, imageMovie, yearMovie, movieId) {
        var body = JSON.stringify({
            titleEn: titleen,
            titleBg: titlebg,
            image: imageMovie,
            year: yearMovie,
            id: movieId
        });
        var headers = { 'content-type': 'application/json' };
        return this.http.put(baseURL + ("/" + id), body, { headers: headers });
    };
    CollectionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CollectionService);
    return CollectionService;
}());
exports.CollectionService = CollectionService;
