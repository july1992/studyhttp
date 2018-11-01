# Studyhttp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 项目说明

angular 初始学习 使用angular6  ， 网络请求：

## 初始化 
'''
export class HeroService {
  private heroesUrl = 'http://192.168.1.127:8086/vily/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
'''
## 请求单个对象
'''
  getHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + 'getHeroById' + '?id=' + id;
    // const url = this.heroesUrl + 'getHeroById' ;
    console.log('-------' + url);
    return this.http.get<Hero>(url, httpOptions ).pipe(
      tap(_ => this.log(`请求 hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
'''
## 请求列表
'''
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
'''  
## 更新对象
'''
  updateHero(hero: Hero): Observable<any> {
    const urlUpdate = this.heroesUrl + 'updateHero' ;
    return this.http.put(urlUpdate, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
'''
## 增加对象

  addHero (hero: Hero): Observable<Hero> {
    const urlAdd = this.heroesUrl + 'addHero' ;
    return this.http.post<Hero>(urlAdd, hero, httpOptions).pipe(
      tap(hh => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

## 删除对象

  deleteHero (hero: Hero): Observable<Hero> {
    const urlAdd = this.heroesUrl + 'deleteHero';
    return this.http.post<Hero>(urlAdd, hero , httpOptions).pipe(
      tap(hh => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

## 查询对象列表

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

## 抽取 log  和  error

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


