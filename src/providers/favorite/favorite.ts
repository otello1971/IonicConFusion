import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider,
    private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    
    //retrieves favorites from local storage
    storage.get('favorites').then(favorites => {
      if (favorites)
        this.favorites = favorites;
      else
        this.favorites = [];
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);  //adds favorites to local storage
    }
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
    //updates favorites in the local storage
    this.storage.set('favorites', this.favorites);
    return this.getFavorites();
  }

}
