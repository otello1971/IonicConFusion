import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes().map(v => v.reduce((acc, x) => 
       this.favorites.reduce((acc2, y) => acc2 || (y === x.id), false) ? [...acc, x]: acc, []));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    this.favorites = this.favorites.reduce((acc, x) => x === id ? acc : [...acc, x], []);
    return this.getFavorites();
  }

}
