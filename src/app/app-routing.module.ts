import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import {HerolistComponent} from './home/herolist/herolist.component';
import {HeroDetailComponent} from './home/hero-detail/hero-detail.component';


const routes: Routes = [
  { path: 'heroes', component: HerolistComponent },

  // { path: '', redirectTo: '/heroes', pathMatch: 'full'},
  { path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
