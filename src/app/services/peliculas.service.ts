import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResonse } from '../interfaces/credits-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor( private http: HttpClient ) { }

  // tslint:disable-next-line: typedef
  get params() {
    return {
      api_key: '20f52e64307e08817f02e9c9d3f28b32',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  // tslint:disable-next-line: typedef
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {
    if ( this.cargando ) {
      return of([]);
    }

    this.cargando = true;
    const url = `${ this.baseUrl }/movie/now_playing`;

    return this.http.get<CarteleraResponse>( url, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  // tslint:disable-next-line: typedef
  buscarPeliculas( texto: string ): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto };
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );
  }

  // tslint:disable-next-line: typedef
  getPeliculaDetalle( id: string ) {
    return this.http.get<MovieResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    );
  }

  // tslint:disable-next-line: typedef
  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CreditsResonse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) )
    );
  }

}
