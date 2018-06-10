import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
import { NewComponent } from './view/new/new.component';
import { SceneComponent } from './view/scene/scene.component';
import { SummaryComponent } from './view/summary/summary.component';
import { ScoresComponent } from './view/scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewComponent,
    SceneComponent,
    SummaryComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
