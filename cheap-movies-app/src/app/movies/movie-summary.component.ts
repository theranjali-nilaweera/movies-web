import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from './Movie';
import { MovieService } from '../movie.service';
import {MovieDetail} from "./MovieDetail";


@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.css']
})
export class MovieSummaryComponent implements OnInit {

  movies: Movie[];
  movieDetails: MovieDetail[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovieSummaries();
  }

  getMovieSummaries(): void {
    this.movieService.getMovieWithSummary()
      .subscribe(movies => {this.movies = movies; this.sortMovies(); this.getMovieDetails();
         });
  }

  sortMovies(): void {
    this.movies.sort((mv1,mv2) => mv1.summary.year-mv2.summary.year );
  }
  getMovieDetails(): void {
    this.movies.forEach( movie => {
      this.movieService.getMovieDetails(movie.id)
        .subscribe(movieDetail => {
          // this.movieDetails = movieDetail;
          this.populateMovieDetails(this.movies, movieDetail);
        });
    });
  }

  private populateMovieDetails(movies, movieDetail): void{
     movies.filter(movie => {
       console.log('movie  movie.id  %j== movieDetail.id; %j',movie.id, movieDetail.id);
       return movie.id == movieDetail.id;
     }).forEach(movie => {
       movie.detail= movieDetail;
       console.log('movie  Detail%j',movie);
       // this.populateDetail(movie, movieDetail);
     })
      // let movieDetail = (movieDetail.find((itmInner) => itmInner.id === movie.id))

      // return this.populateDetail(movie, movieDetail);
    // })
  }

  private populateDetail(movie, detail): Movie {
    movie.detail= detail;
    console.log('movie  Detail%j',movie);
    return movie;
  }



}

