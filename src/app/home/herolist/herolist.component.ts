import { Component, OnInit } from '@angular/core';
import {Hero} from '../../bean/Hero';
import {HeroService} from '../../service/hero.service';


@Component({
  selector: 'app-herolist',
  templateUrl: './herolist.component.html',
  styleUrls: ['./herolist.component.css']
})
export class HerolistComponent implements OnInit {
  heroes: Hero[];
  // selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(r => {
        console.log(r);
        this.heroes = r;
      });
  }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
  //

}
