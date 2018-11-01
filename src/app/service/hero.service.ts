import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {Hero} from '../bean/Hero';

import {HttpClient , HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://192.168.1.127:8086/vily/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  getHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + 'getHeroById' + '?id=' + id;
    // const url = this.heroesUrl + 'getHeroById' ;
    console.log('-------' + url);
    return this.http.get<Hero>(url, httpOptions ).pipe(
      tap(_ => this.log(`请求 hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }
  getHeroes(): Observable<Hero[]> {
    const url2 = this.heroesUrl + 'getHeroes';
    console.log('-------' + url2);
    return this.http.get<Hero[]>(url2 , httpOptions)
      .pipe(
        tap(heroes => {
          this.log('请求');
        }),
        catchError(this.handleError('getHeroes', []))
      );
  }
  updateHero(hero: Hero): Observable<any> {
    const urlUpdate = this.heroesUrl + 'updateHero' ;
    return this.http.put(urlUpdate, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    const urlAdd = this.heroesUrl + 'addHero' ;
    return this.http.post<Hero>(urlAdd, hero, httpOptions).pipe(
      tap(hh => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero (hero: Hero): Observable<Hero> {
    const urlAdd = this.heroesUrl + 'deleteHero';
    return this.http.post<Hero>(urlAdd, hero , httpOptions).pipe(
      tap(hh => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const urlSearch = this.heroesUrl + 'searchHero' + '?name=' + term;
    return this.http.get<Hero[]>(urlSearch).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
