import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  constructor() { }

  public mySwiper: Swiper;

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {

    // console.log(this.movies);
  }

  // tslint:disable-next-line: typedef
  onSlideNext() {
    this.mySwiper.slideNext();
  }

  // tslint:disable-next-line: typedef
  onSlidePrev() {
    this.mySwiper.slidePrev();
  }
}
