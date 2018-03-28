import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameSceneComponent } from './view/game-scene/game-scene.component';
import { HighScoresComponent } from './view/high-scores/high-scores.component';
import { MainMenuComponent } from  './view/main-menu/main-menu.component';

const routes: Routes = [
  { path: 'play', component: GameSceneComponent },
  { path: 'scores', component: HighScoresComponent },
  { path: 'main', component: MainMenuComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
