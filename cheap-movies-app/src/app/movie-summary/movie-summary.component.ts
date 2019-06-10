import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import {MovieDetail} from "../MovieDetail";


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
      .subscribe(movies => {this.movies = movies;  this.getMovieDetails();
         });
  }

  getMovieDetails(): void {
    this.movieService.getMovieDetails(this.movies)
      .subscribe(movieDetails => {
        this.movieDetails = movieDetails;
        this.populateMovieDetails(this.movies, movieDetails);
      });
  }

  private populateMovieDetails(movies, movieDetails): Movie[]{
    return movies.forEach(movie => {
      let movieDetail = (movieDetails.find((itmInner) => itmInner.id === movie.id))
      console.log('movie  Detail%j',movieDetail);
      return this.populateDetail(movie, movieDetail);
    })
  }

  private populateDetail(movie, detail): Movie {
    movie.detail= detail;
    console.log('movie  Detail%j',movie);
    return movie;
  }



}

