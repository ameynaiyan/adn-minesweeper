import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './view/main-menu/main-menu.component';
import { HighScoresComponent } from './view/high-scores/high-scores.component';
import { GameSceneComponent } from './view/game-scene/game-scene.component';
import { NewGameConfigComponent } from './view/new-game-config/new-game-config.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HighScoresComponent,
    GameSceneComponent,
    NewGameConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
