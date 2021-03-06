import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserData } from '../registration/registration.component';
import {Router, CanActivate} from '@angular/router';

export interface Movie{
  titleEn: string;
  titleBg: string;
  image: string;
  year: string;
  genre: string;
  producer: string;
  rating?: number;
  watches?: number;
  country: string;
  _id: string;
  description: string;
  id?: string;
  trailer: string;
  averageRating?: string;
  userId?: string;
}
const baseUrl = 'http://localhost:8080/api/movies';
@Injectable({
  providedIn: 'root',
})

export class MovieService implements CanActivate {
  user: UserData;

  constructor(private http: HttpClient, private router: Router){}
  getAll(): Observable<Movie[]>{
    return this.http.get<Movie[]>(baseUrl);
  }
  getMovieById(id): Observable<Movie>{
    return this.http.get<Movie>(baseUrl + `/${id}`);
  }
  canActivate(id): Observable<boolean> {
    this.getMovieById(id).subscribe(
      data => {
      this.router.navigate(['movie/' + data._id]);
    });
    return of(false);
  }
  addMovie(movie: Movie): Observable<Movie> {
    const body = JSON.stringify(movie);
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Movie>(baseUrl, body, {headers});
  }
  editMovie(movie: Movie): Observable<Movie> {
    const body = JSON.stringify(movie);
    const headers = { 'content-type': 'application/json'};
    return this.http.patch<Movie>(baseUrl + `/${movie._id}`, body, {headers});
  }
  removeMovie(movie: Movie): Observable<Movie> {
    return this.http.delete<Movie>(baseUrl + `/${movie._id}`);
  }
  rateMovie(movieId: string, userRating: string, user: string): Observable<Movie>{
    const body = JSON.stringify({
      userId: user,
      rating: userRating,
    });
    const headers = { 'content-type': 'application/json'};
    return this.http.put<Movie>(baseUrl + `/${movieId}`, body, {headers});
  }
}
