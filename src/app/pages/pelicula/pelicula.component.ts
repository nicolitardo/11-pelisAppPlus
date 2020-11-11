import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id )

    // ]).subscribe( ( obj ) => {
    //   const pelicula = obj[0];
    //   const cast = obj[1];
    // });
    ]).subscribe( ( [pelicula, cast] ) => {
      // console.log(pelicula, cast);
      if ( !pelicula ) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = pelicula;
      this.cast = cast.filter( actor => actor.profile_path !== null );
    });

  }

  // tslint:disable-next-line: typedef
  onRegresar() {
    this.location.back();
  }

}
