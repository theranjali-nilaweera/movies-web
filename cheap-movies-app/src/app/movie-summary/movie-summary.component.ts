import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.css']
})
export class MovieSummaryComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovieSummaries();
  }

  getMovieSummaries(): void {
    this.movieService.getMovieSummaries()
      .subscribe(movies => this.movies = movies);
  }

}

