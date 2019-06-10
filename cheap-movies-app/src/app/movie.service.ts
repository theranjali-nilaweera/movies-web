import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Movie } from './Movie';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesUrlSuffix = 'summary';
  movieDetailUrlSuffix = 'detail';
  retryCount = 3;

  constructor(private httpService: HttpService) { }

  getMovieSummaries(): Observable<Movie[]> {
    return this.httpService.performGet(this.moviesUrlSuffix)
      .pipe(
        retry(this.retryCount),
        catchError((error, caught) => {
          console.log(error);
          return caught;
        })
      );
  }


  // transformMovieSummaries(response): Movie[] {
  //
  // }

  allMovies: Movie[] = [
    { id: '11', title: 'Dr Nice' },
    { id: '12', title: 'Narco' },
    { id: '13', title: 'Bombasto' },
    { id: '20', title: 'Tornado' }
  ];
}
