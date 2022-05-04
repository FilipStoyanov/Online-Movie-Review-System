import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/registration/registration.component';
import { Store } from '@ngrx/store';
import { addUser } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public closeResult: string;
  public emailInput: string;
  public passwordInput: string;
  private user: Login = {token: '', username: '', password: ''};
  public invalidCredentials: boolean;
  constructor(private modalService: NgbModal, private userService: LoginService, private userDataService: UserService,
              private router: Router, private store: Store<{user: UserData}>) {
    this.invalidCredentials = false;
   }

  ngOnInit(): void {
  }

  openModal(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  logIn(): void {
     this.userService.addLoggedUser(this.user).subscribe(
       data => { },
       error => this.invalidCredentials = true ) ;
     this.userDataService.getUser(this.emailInput).subscribe(
    data => { localStorage.setItem('user', JSON.stringify(data));
              this.router.navigate([`/`]).then( () => window.location.reload()); },
    );

  }

    // this.store.dispatch(addUser({user: data}));
  onChangeEmail(event): void {
    this.emailInput = event.target.value;
    this.user.username = this.emailInput;
  }
  onChangePassword(event): void {
    this.passwordInput = event.target.value;
    this.user.password = this.passwordInput;
  }
}