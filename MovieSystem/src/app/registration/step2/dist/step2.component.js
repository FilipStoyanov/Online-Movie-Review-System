"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Step2Component = void 0;
var core_1 = require("@angular/core");
var Step2Component = /** @class */ (function () {
    function Step2Component(userService, store) {
        this.userService = userService;
        this.store = store;
        this.data = { username: '', password: '', repeatPassword: '' };
        this.user = { username: '', password: '', repeatPassword: '', firstname: '', lastname: '', email: '', image: '', _id: '',
            birthdate: '', friends: [], genres: [] };
        this.validation = { username: true, password: true, repeatPassword: true };
        this.genres = [
            'Action',
            'Comedy',
            'Animations',
            'Drama',
            'Fantasy',
            'Horror',
            'Science fiction',
            'Western',
        ];
        this.nextBtn = {
            isAnchor: false,
            externalStyles: {
                color: '#ffffff',
                width: '150px',
                fontSize: '20px'
            },
            text: 'Завърши',
            nextBtn: true
        };
        this.backBtn = {
            isAnchor: false,
            externalStyles: {
                color: '#ffffff',
                width: '150px',
                fontSize: '20px'
            },
            text: 'Назад',
            nextBtn: false
        };
        this.favoriteGenres = [];
        this.durationInSeconds = 5;
        this.showAlert = false;
        this.imageUrl = '';
        this.verticalPosition = 'top';
        this.statusCode = true;
        this.horizontalPosition = 'center';
    }
    Step2Component.prototype.updateUsername = function (newUsername) {
        this.data.username = newUsername;
        this.validation.username = this.data.username.length > 3 || this.data.username.length === 0;
        this.user.username = this.data.username;
    };
    Step2Component.prototype.updatePassword = function (newPassword) {
        this.data.password = newPassword;
        this.validation.password = this.data.password.length >= 6 || this.data.password.length === 0;
        if (this.data.repeatPassword === this.data.password) {
            this.validation.repeatPassword = true;
        }
        this.user.password = this.data.password;
    };
    Step2Component.prototype.updateRepeatPassword = function (newPassword) {
        this.data.repeatPassword = newPassword;
        this.validation.repeatPassword = this.data.repeatPassword.length >= 6 || this.data.repeatPassword.length === 0;
        this.validation.repeatPassword = this.validation.repeatPassword && this.data.repeatPassword === this.data.password;
        this.user.repeatPassword = this.data.repeatPassword;
    };
    Step2Component.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) {
                _this.imageUrl = reader_1.result;
            };
            reader_1.readAsDataURL(file);
        }
    };
    Step2Component.prototype.uploadImage = function () {
        document.getElementById('imageUpload').click();
    };
    Step2Component.prototype.removeImage = function () {
        this.imageUrl = '';
    };
    Step2Component.prototype.onBtnClick = function () {
        if (this.imageUrl === '') {
            this.uploadImage();
        }
        else {
            this.removeImage();
        }
    };
    Step2Component.prototype.isAlreadyAdded = function (element) {
        for (var _i = 0, _a = this.favoriteGenres; _i < _a.length; _i++) {
            var curr = _a[_i];
            if (curr === element) {
                return true;
            }
        }
        return false;
    };
    Step2Component.prototype.addFavGenre = function (newGenre) {
        if (!this.isAlreadyAdded(newGenre)) {
            this.favoriteGenres.push(newGenre);
        }
        else {
            this.alreadyAddedThisGenre();
        }
    };
    Step2Component.prototype.alreadyAddedThisGenre = function () {
        var _this = this;
        this.showWarning = true;
        setTimeout(function () {
            _this.showWarning = false;
        }, 4000);
    };
    Step2Component.prototype.removeGenre = function (element) {
        var _this = this;
        this.favoriteGenres.forEach(function (item, index) {
            if (item === element) {
                _this.favoriteGenres.splice(index, 1);
            }
        });
    };
    Step2Component.prototype.goForward = function (stepper) {
        var _this = this;
        this.validation.repeatPassword = this.data.repeatPassword.length >= 6 && this.data.repeatPassword === this.data.password;
        this.validation.password = this.data.password.length >= 6;
        this.validation.username = this.data.username.length > 3;
        this.user.image = this.imageUrl;
        this.user.genres = this.favoriteGenres;
        if (this.validation.username && this.validation.password && this.validation.repeatPassword) {
            this.userService.addUser(this.user).subscribe(function (data) {
                if (data) {
                    stepper.next();
                    _this.user._id = data._id;
                    localStorage.setItem('user', JSON.stringify(_this.user));
                }
                else {
                    _this.showAlert = true;
                }
            });
            // POST REQUEST TO THE BACKEND HERE
        }
        else {
            this.validation.username = (this.validation.username === true);
            this.validation.password = (this.validation.password === true);
            this.validation.repeatPassword = (this.validation.repeatPassword === true);
        }
    };
    Step2Component.prototype.goBack = function (stepper) {
        //  this.step --;
        stepper.previous();
    };
    Step2Component.prototype.close = function () {
        this.showAlert = false;
    };
    Step2Component.prototype.ngOnInit = function () {
    };
    Step2Component.prototype.ngDoCheck = function () {
        this.user.firstname = this.userData1.firstName;
        this.user.lastname = this.userData1.lastName;
        this.user.email = this.userData1.email;
        this.user.birthdate = this.userData1.birthdate;
    };
    __decorate([
        core_1.Input()
    ], Step2Component.prototype, "stepper");
    __decorate([
        core_1.Input()
    ], Step2Component.prototype, "userData1");
    Step2Component = __decorate([
        core_1.Component({
            selector: 'app-step2',
            templateUrl: './step2.component.html',
            styleUrls: ['./step2.component.scss']
        })
    ], Step2Component);
    return Step2Component;
}());
exports.Step2Component = Step2Component;
