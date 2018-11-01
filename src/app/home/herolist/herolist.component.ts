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
  // hero: Hero ;
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
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    console.log('--------' + {name}.name);
    this.heroService.addHero({name} as Hero )
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  deleteHero(hero: Hero ): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero)
      .subscribe();
  }

}
