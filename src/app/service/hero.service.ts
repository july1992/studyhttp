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
  private heroesUrl: 'api/heroes';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService: 请求： id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));

    const url = `${this.heroesUrl}/${id}`;
    console.log('-------' + url);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  getHeroes(): Observable<Hero[]> {
    // this.messageService.add(`HeroService: 请求： `);
    // return of(HEROES);
    console.log('-------');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => {
          console.log('-------');
          this.log('gg');
        }),
        catchError(this.handleError('getHeroes', []))
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
