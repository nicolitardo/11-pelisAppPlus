import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';


@Component({
  selector: 'app-peliculas-poster-grip',
  templateUrl: './peliculas-poster-grip.component.html',
  styleUrls: ['./peliculas-poster-grip.component.css']
})
export class PeliculasPosterGripComponent implements OnInit {

  @Input() movies: Movie[];

  constructor( private router: Router) { }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  // tslint:disable-next-line: typedef
  onMovieClick( movie: Movie ) {
    console.log(movie);
    this.router.navigate(['/pelicula', movie.id]);
  }

}
