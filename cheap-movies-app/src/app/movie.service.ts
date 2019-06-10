import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Movie } from './Movie';
import { MovieDetail } from './MovieDetail';
import { MovieSummary } from './MovieSummary';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesUrlSuffix = 'summary';
  movieDetailUrlSuffix = 'detail';
  retryCount = 3;

  constructor(private httpService: HttpService) { }

  populateMoviesFromSummary(movieSummaries): Movie[]{
    return movieSummaries.map(summary => {
      return this.populateSummary(summary);
    });
  }
  populateSummary(summary): Movie {
    let movie = new Movie();
    movie.id = summary.id;
    movie.summary= summary;
    return movie;
  }
  getMovieWithSummary(): Observable<Movie[]> {
    return this.httpService.performGet(this.moviesUrlSuffix)
      .pipe(
        retry(this.retryCount),
        map(movieSummary => this.populateMoviesFromSummary(movieSummary)),
        catchError((error, caught) => {
          console.log(error);
          return caught;
        })
      );
  }

  getMovieDetails(movies: Movie[]): Observable<MovieDetail[]> {
    // return this.httpService.performGet(this.moviesUrlSuffix)
    return of(this.allMoviesDetail)
      .pipe(
        retry(this.retryCount),
        // map(movieSummary => this.populateMovieDetails(movies, movieSummary)),
        catchError((error, caught) => {
          console.log(error);
          return caught;
        })
      );
  }



  allMoviesDetail: MovieDetail[] = [
    { id: '0086190', type: 'Dr Nice' , plot: 'ploat a'},
    { id: '0121765', type: 'Narco',plot: 'ploat a' },
    { id: '0121766', type: 'Bombasto' ,plot: 'ploat a'},
    { id: '0120915', type: 'Tornado' ,plot: 'ploat a'}
  ];
}
