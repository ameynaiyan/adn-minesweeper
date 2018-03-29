import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameSceneComponent } from './view/game-scene/game-scene.component';
import { HighScoresComponent } from './view/high-scores/high-scores.component';
import { MainMenuComponent } from  './view/main-menu/main-menu.component';
import { NewGameConfigComponent } from './view/new-game-config/new-game-config.component';

const routes: Routes = [
  { path: 'play', component: GameSceneComponent },
  { path: 'scores', component: HighScoresComponent },
  { path: 'main', component: MainMenuComponent },
  { path: 'new', component: NewGameConfigComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
