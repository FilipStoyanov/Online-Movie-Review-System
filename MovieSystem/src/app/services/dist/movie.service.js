"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovieService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var baseUrl = 'http://localhost:8080/api/movies';
var MovieService = /** @class */ (function () {
    function MovieService(http, router) {
        this.http = http;
        this.router = router;
    }
    MovieService.prototype.getAll = function () {
        return this.http.get(baseUrl);
    };
    MovieService.prototype.getMovieById = function (id) {
        return this.http.get(baseUrl + ("/" + id));
    };
    MovieService.prototype.canActivate = function (id) {
        var _this = this;
        this.getMovieById(id).subscribe(function (data) {
            _this.router.navigate(['movie/' + data._id]);
        });
        return rxjs_1.of(false);
    };
    MovieService.prototype.addMovie = function (movie) {
        var body = JSON.stringify(movie);
        var headers = { 'content-type': 'application/json' };
        return this.http.post(baseUrl, body, { headers: headers });
    };
    MovieService.prototype.editMovie = function (movie) {
        var body = JSON.stringify(movie);
        var headers = { 'content-type': 'application/json' };
        return this.http.patch(baseUrl + ("/" + movie._id), body, { headers: headers });
    };
    MovieService.prototype.removeMovie = function (movie) {
        return this.http["delete"](baseUrl + ("/" + movie._id));
    };
    MovieService.prototype.rateMovie = function (movieId, userRating, user) {
        var body = JSON.stringify({
            userId: user,
            rating: userRating
        });
        var headers = { 'content-type': 'application/json' };
        return this.http.put(baseUrl + ("/" + movieId), body, { headers: headers });
    };
    MovieService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MovieService);
    return MovieService;
}());
exports.MovieService = MovieService;
