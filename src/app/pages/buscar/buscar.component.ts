import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public movies: Movie[] = [];
  public texto = '';

  constructor( private activatedRoute: ActivatedRoute,
               private peliculaService: PeliculasService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => this.texto = params.texto );
    this.peliculaService.buscarPeliculas( this.texto ).subscribe( movies => {
      this.movies = movies;
    });
  }

}
